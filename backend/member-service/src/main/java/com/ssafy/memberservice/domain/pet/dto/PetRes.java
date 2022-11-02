package com.ssafy.memberservice.domain.pet.dto;

import com.ssafy.memberservice.domain.pet.domain.Pet;
import lombok.Builder;
import lombok.Data;

@Data
public class PetRes{
    String name;
    Integer level;
    String fileUrl;
    Integer maxExp;
    String description;

    @Builder
    public PetRes(Pet pet){
        this.name = pet.getCategory().name();
        this.level = pet.getLevel();
        this.fileUrl = pet.getFileUrl();
        this.maxExp = pet.getMaxExp();
        this.description = pet.getDescription();
    }

}
