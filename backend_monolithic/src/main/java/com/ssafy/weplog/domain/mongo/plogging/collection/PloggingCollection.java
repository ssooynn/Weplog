package com.ssafy.weplog.domain.mongo.plogging.collection;

import com.ssafy.weplog.domain.mongo.plogging.dto.Coordinate;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "plogging")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class PloggingCollection {

    @Id
    private Long id;

    private List<Coordinate> coordinates = new ArrayList<>();
}
