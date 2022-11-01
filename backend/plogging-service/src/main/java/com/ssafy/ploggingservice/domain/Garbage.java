package com.ssafy.ploggingservice.domain;


import com.ssafy.ploggingservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Base64;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Garbage extends BaseEntity {

    @Id
    @Column(name = "garbage_id")
    Long garbageId;
    @Column(name = "address")
    String address;
    @Column(name = "lat")
    double lat;
    @Column(name = "lng")
    double lng;

}
