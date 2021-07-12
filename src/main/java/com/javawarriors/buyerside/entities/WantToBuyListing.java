package com.javawarriors.buyerside.entities;

import javax.persistence.*;
import java.util.*;

/**
 * Java class that represents users in the database
 */
@Entity
@Table(name = "want_to_buy_listing")
public class WantToBuyListing {

    @Id
    @Column(name="wtb_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wtbId;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    private String picUri;

    private String title;

    private String description;

    private Character status;

    private Double priceUpper;

    private Double priceLower;

    @ManyToOne
    @JoinColumn(name="category_name")
    private Category category;

    @ManyToMany
    @JoinTable(
        name="wtb_tags",
        joinColumns= {
            @JoinColumn(name="wtb_id", referencedColumnName = "wtb_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name="tag_category_name", referencedColumnName = "tag_category_name"),
            @JoinColumn(name="tag_value", referencedColumnName = "tag_value")
        }
    )
    private Set<Tag> tags;

    /** getters and setters for the variables of the WTBlisting */

	public Long getWtbId() {
		return this.wtbId;
	}

	public void setWtbId(Long wtbId) {
		this.wtbId = wtbId;
	}
    
    public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

    public String getPicUri() {
        return this.picUri;
    }

    public void setPicUri(String picUri) {
        this.picUri = picUri;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Character getStatus() {
        return this.status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Double getPriceUpper() {
		return this.priceUpper;
	}

	public void setPriceUpper(Double priceUpper) {
		this.priceUpper = priceUpper;
	}

	public Double getPriceLower() {
		return this.priceLower;
	}

	public void setPriceLower(Double priceLower) {
		this.priceLower = priceLower;
	}
    

}