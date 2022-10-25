package com.ssafy.weplog.domain.mongo.plogging.dao;

import com.ssafy.weplog.domain.mongo.plogging.collection.PloggingCollection;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PloggingCollectionRespository extends MongoRepository<PloggingCollection, Long> {
}
