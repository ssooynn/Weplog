package com.ssafy.memberservice.domain.memberpet.dto;

import com.ssafy.memberservice.domain.memberpet.dao.domain.MemberPet;
import lombok.Builder;

public class MemberPetRes {
    int level;
    int imageLevel;
    int current_exp;
    int max_exp;
    String name;
    String file_url;
    String description;

    @Builder
    public MemberPetRes(MemberPet memberPet){
        this.level = memberPet.getCurrentLevel();
        this.imageLevel = memberPet.getImageLevel();
        this.current_exp = memberPet.getCurrentExp();
        this.max_exp = memberPet.getMaxExp();
        this.name = memberPet.getName().name();
        this.file_url = memberPet.getFileUrl();
        this.description = memberPet.getPet().getDescription();
    }

}
