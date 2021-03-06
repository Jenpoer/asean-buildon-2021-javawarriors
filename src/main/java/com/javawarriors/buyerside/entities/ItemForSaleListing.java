package com.javawarriors.buyerside.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.util.*;

@JsonIgnoreProperties(ignoreUnknown = true) // Ignores any unknown field when parsing JSON
@Entity
@Table(name="item_for_sale_listing")
public class ItemForSaleListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ifs_id")
    private Long ifsId; 

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;
 
    private String picUri;

    private String title;

    private String description;

    private Character status;

    private String listingType;

    private Double price;

    private String categoryName;

	private String itemCondition;

	private Boolean isDeliveryMeet;

	private Boolean isDeliveryDeliver;

	private Boolean isPaymentCash;

	private Boolean isPaymentPayNow;

	private String meetUpLocation;

	private Date dateOfCreation;

    public Long getIfsId() {
		return this.ifsId;
	}

	public void setIfsId(Long ifsId) {
		this.ifsId = ifsId;
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

	public String getListingType() {
		return this.listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Double getPrice() {
		return this.price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getItemCondition() {
		return this.itemCondition;
	}

	public void setItemCondition(String itemCondition) {
		this.itemCondition = itemCondition;
	}

	public Boolean getIsDeliveryMeet() {
		return this.isDeliveryMeet;
	}

	public void setIsDeliveryMeet(Boolean iSDeliveryMeet) {
		this.isDeliveryMeet = iSDeliveryMeet;
	}

	public Boolean getIsDeliveryDeliver() {
		return this.isDeliveryDeliver;
	}

	public void setIsDeliveryDeliver(Boolean isDeliveryDeliver) {
		this.isDeliveryDeliver = isDeliveryDeliver;
	}

	public Boolean getIsPaymentCash() {
		return this.isPaymentCash;
	}

	public void setIsPaymentCash(Boolean isPaymentCash) {
		this.isPaymentCash = isPaymentCash;
	}

	public Boolean getIsPaymentPayNow() {
		return this.isPaymentPayNow;
	}

	public void setIsPaymentPayNow(Boolean isPaymentPayNow) {
		this.isPaymentPayNow = isPaymentPayNow;
	}

	public String getMeetUpLocation() {
		return this.meetUpLocation;
	}

	public void setMeetUpLocation(String meetUpLocation) {
		this.meetUpLocation = meetUpLocation;
	}

	public Date getDateOfCreation() {
		return this.dateOfCreation;
	}

	public void setDateOfCreation(Date dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
	}

}
