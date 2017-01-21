package at.rolger.vb.dao;

import java.time.LocalDate;
import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import at.rolger.vb.model.Spieler;

public interface SpielerRepository extends JpaRepository<Spieler, Long> {
	    Collection<Spieler> findByAbendeTag(LocalDate tag);
}
