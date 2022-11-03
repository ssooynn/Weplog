package com.ssafy.ploggingservice.dto;

import com.ssafy.ploggingservice.domain.Plogging;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePloggingRes {

    private Long ploggingId;

    public static CreatePloggingRes from(Plogging plogging) {
        CreatePloggingRes createPloggingRes = new CreatePloggingRes();
        createPloggingRes.ploggingId = plogging.getId();

        return createPloggingRes;
    }
}
