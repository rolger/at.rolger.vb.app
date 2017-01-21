package at.rolger.vb.dao;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import at.rolger.vb.model.Spielabend;

public interface SpielerAbendRepository extends JpaRepository<Spielabend, Integer> {
	    Collection<Spielabend> findBySpielerName(String name);
}
