package at.rolger.vb.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Spielabend {

	@Id
	@GeneratedValue
	private Integer id;
	private LocalDate tag;

	@ManyToOne
	@JsonIgnore
	private Spieler spieler;

	@JsonIgnore
	private int wochenTag;
	@JsonIgnore
	private String semester;

	public Spielabend() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getTag() {
		return tag;
	}

	public void setTag(LocalDate tag) {
		this.tag = tag;
	}

	public Spieler getSpieler() {
		return spieler;
	}

	public void setSpieler(Spieler spieler) {
		this.spieler = spieler;
	}

	public int getWochenTag() {
		return wochenTag;
	}

	public void setWochenTag(int wochenTag) {
		this.wochenTag = wochenTag;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

}
