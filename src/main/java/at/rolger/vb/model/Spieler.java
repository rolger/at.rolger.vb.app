package at.rolger.vb.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Spieler {

	@Id
	@GeneratedValue
	private Long id;

	private String firstname;
	private String name;
	private String address;
	private LocalDate birthdate;
	private String telefon;
	private String sex;
	private boolean active;

	@OneToMany(mappedBy = "spieler")
	private Set<Spielabend> abende = new HashSet<>();;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstName) {
		this.firstname = firstName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public LocalDate getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(LocalDate date) {
		this.birthdate = date;
	}

	@Override
	public String toString() {
		String str = String.valueOf(getId());

		str += ":\t" + getFirstname() + " " + getName() + " / " + getBirthdate();
		str += "\n\t" + getAddress();
		str += "\n\t" + getTelefon();
		str += "\n\t" + getSex();

		str += "\n\t";

		// for (String training : abende) {
		// str += " " + training;
		// }

		return str;
	}

	public Set<Spielabend> getAbende() {
		return abende;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public void setAbende(Set<Spielabend> abende) {
		this.abende = abende;
	}

	public void addTraining(Spielabend training) {
		getAbende().add(training);
		if (!this.equals(training.getSpieler())) {
			training.setSpieler(this);
		}
	}

}
