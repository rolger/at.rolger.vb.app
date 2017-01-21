package at.rolger.vb;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import at.rolger.vb.dao.SpielerAbendRepository;
import at.rolger.vb.dao.SpielerRepository;
import at.rolger.vb.model.Spielabend;
import at.rolger.vb.model.Spieler;

@RestController
@RequestMapping(value = "/api")
public class VolleyballService {

	private final SpielerRepository spielerRepository;;
	private final SpielerAbendRepository spielAbendRepository;;

	@Autowired
	public VolleyballService(SpielerRepository spielerRepository, SpielerAbendRepository spielerAbendRepository) {
		this.spielerRepository = spielerRepository;
		this.spielAbendRepository = spielerAbendRepository;
	}

	@RequestMapping(value = "/spieler", method = RequestMethod.GET)
	public Collection<Spieler> findPlayers(@RequestParam(value = "date", required = false) String trainingDate,
			@RequestParam(value = "active", required = false) Boolean active,
			@RequestParam(value = "currentSeason", required = false) Boolean currentSeason) {
		Collection<Spieler> playersFound = Collections.emptyList();

		if (active != null) {
			Spieler player = new Spieler();
			player.setActive(active);
			playersFound = spielerRepository.findAll(Example.of(player));
		} else if (trainingDate != null) {
			LocalDate training = LocalDate.parse(trainingDate, DateTimeFormatter.ofPattern("dd.MM.yyyy"));
			playersFound = spielerRepository.findByAbendeTag(training);
		} else {
			playersFound = spielerRepository.findAll();
		}
		return playersFound;
	}

	@RequestMapping(value = "/spieler/{id}", method = RequestMethod.GET)
	public Spieler readPlayer(@PathVariable Long id) {
		Spieler findOne = spielerRepository.findOne(id);
		return findOne;
	}

	@RequestMapping(value = "/spieler", method = RequestMethod.POST)
	public ResponseEntity<?> add(@RequestBody Spieler input) {
		Spieler spieler = new Spieler();
		spieler.setFirstname(input.getFirstname());
		spieler.setName(input.getName());
		spieler.setBirthdate(input.getBirthdate());
		spieler.setAddress(input.getAddress());
		spieler.setSex(input.getSex());
		spieler.setTelefon(input.getTelefon());
		spieler.setActive(true);

		Spieler result = spielerRepository.save(spieler);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@RequestMapping(value = "/spieler/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Spieler input) {
		Spieler spieler = spielerRepository.findOne(id);
		spieler.setFirstname(input.getFirstname());
		spieler.setName(input.getName());
		spieler.setBirthdate(input.getBirthdate());
		spieler.setAddress(input.getAddress());
		spieler.setSex(input.getSex());
		spieler.setTelefon(input.getTelefon());
		spieler.setActive(input.isActive());

		Spieler result = spielerRepository.save(spieler);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(result.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@RequestMapping(value = "/spieler/{spielerId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable Long spielerId) {
		Spieler spieler = spielerRepository.findOne(spielerId);
		spielAbendRepository.delete(spieler.getAbende());
		spielerRepository.delete(spielerId);

		return (ResponseEntity.noContent().build());
	}

	@RequestMapping(value = "/spieler/{spielerId}/trainings", method = RequestMethod.POST)
	ResponseEntity<?> add(@PathVariable Long spielerId, @RequestBody Spielabend input) {
		Spielabend training = new Spielabend();
		training.setTag(input.getTag());
		training.setWochenTag(input.getTag().getDayOfWeek().getValue());
		training.setSemester(berechneSemester(input.getTag()));

		Spieler spieler = spielerRepository.findOne(spielerId);
		spieler.addTraining(training);

		spielerRepository.save(spieler);
		spielAbendRepository.save(training);

		return (ResponseEntity.noContent().build());
	}

	public String berechneSemester(LocalDate aDate) {
		String semester = "";
		if (aDate.getMonthValue() >= 9 || aDate.getMonthValue() <= 1) {
			semester = "WS ";
		} else {
			semester = "SS ";
		}
		if (aDate.getMonthValue() == 1) {
			semester += (aDate.getYear() - 1);
		} else {
			semester += aDate.getYear();
		}
		return semester;
	}

	@RequestMapping(value = "/spieler/{spielerId}/trainings/{trainingId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteTraining(@PathVariable Long spielerId, @PathVariable Integer trainingId) {
		Spieler spieler = spielerRepository.findOne(spielerId);
		spieler.getAbende().removeIf(training -> training.getId() == trainingId);

		spielAbendRepository.delete(trainingId);

		return (ResponseEntity.noContent().build());
	}

	@RequestMapping(value = "/trainings", method = RequestMethod.GET)
	public Collection<Spielabend> readTrainings() {
		List<Spielabend> findAll = spielAbendRepository.findAll();
		return findAll;
	}

}
