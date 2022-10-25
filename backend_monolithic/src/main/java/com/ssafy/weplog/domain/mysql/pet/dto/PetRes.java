package com.ssafy.weplog.domain.mysql.pet.dto;

import com.ssafy.weplog.domain.mysql.pet.domain.Pet;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;

@Data
public class PetRes{
    String name;
    Integer level;
    String fileUrl;
    Integer maxExp;
    String description;

    @Builder
    public PetRes(Pet pet){
        this.name = pet.getCategory();
        this.level = pet.getLevel();
        this.fileUrl = pet.getFileUrl();
        this.maxExp = pet.getMaxExp();
        this.description = pet.getDescription();
    }

}
