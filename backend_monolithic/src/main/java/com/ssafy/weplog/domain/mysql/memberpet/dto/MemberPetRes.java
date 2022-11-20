package com.ssafy.weplog.domain.mysql.memberpet.dto;

import com.ssafy.weplog.domain.mysql.member.domain.Member;
import com.ssafy.weplog.domain.mysql.memberpet.domain.MemberPet;
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
        this.name = memberPet.getName();
        this.file_url = memberPet.getFileUrl();
        this.description = memberPet.getPet().getDescription();
    }

}
