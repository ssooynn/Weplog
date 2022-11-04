-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema weplog
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema weplog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `weplog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `weplog` ;

-- -----------------------------------------------------
-- Table `weplog`.`achievement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`achievement` (
  `achievement_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `goal` INT NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `level` INT NULL DEFAULT NULL,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  `reward_point` INT NULL DEFAULT NULL,
  `type` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`achievement_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`challenge_limit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`challenge_limit` (
  `challenge_limit_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `max_cnt` INT NULL DEFAULT NULL,
  `reward_point` INT NULL DEFAULT NULL,
  PRIMARY KEY (`challenge_limit_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`challenge_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`challenge_type` (
  `challenge_type_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  `challenge_limit_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`challenge_type_id`),
  INDEX `foreign_challenge_limit_challenge_limit_id_idx` (`challenge_limit_id` ASC) VISIBLE,
  CONSTRAINT `foreign_challenge_limit_challenge_limit_id`
    FOREIGN KEY (`challenge_limit_id`)
    REFERENCES `weplog`.`challenge_limit` (`challenge_limit_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`challenge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`challenge` (
  `challenge_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `finish_flag` BIT(1) NULL DEFAULT NULL,
  `goal` INT NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `max_participants_cnt` INT NULL DEFAULT NULL,
  `participants_cnt` INT NULL DEFAULT NULL,
  `progress` INT NULL DEFAULT NULL,
  `reward_point` INT NULL DEFAULT NULL,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `type` VARCHAR(10) NULL DEFAULT NULL,
  `challenge_type_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  `total_distance` INT NULL DEFAULT '0',
  `total_time` INT NULL DEFAULT '0',
  `total_plogging_cnt` INT NULL DEFAULT '0',
  PRIMARY KEY (`challenge_id`),
  INDEX `FK9yxtns0gpuxlykm5bs3ju3vjr` (`challenge_type_id` ASC) VISIBLE,
  INDEX `foreingkey_member_member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK9yxtns0gpuxlykm5bs3ju3vjr`
    FOREIGN KEY (`challenge_type_id`)
    REFERENCES `weplog`.`challenge_type` (`challenge_type_id`),
  CONSTRAINT `foreingkey_member_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`member` (
  `member_id` BINARY(16) NOT NULL,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `login_path` VARCHAR(10) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `name` VARCHAR(10) NULL DEFAULT NULL,
  `nickname` VARCHAR(10) NULL DEFAULT NULL,
  `profile_image_url` VARCHAR(255) NULL DEFAULT NULL,
  `refresh_token` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(20) NULL DEFAULT NULL,
  `social_id` VARCHAR(255) NULL DEFAULT NULL,
  `weight` INT NULL DEFAULT NULL,
  `challenging_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE INDEX `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname` ASC) VISIBLE,
  INDEX `FKm9664id4c1eqj3vvc16kev1yu` (`challenging_id` ASC) VISIBLE,
  CONSTRAINT `FKm9664id4c1eqj3vvc16kev1yu`
    FOREIGN KEY (`challenging_id`)
    REFERENCES `weplog`.`challenge` (`challenge_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`crew`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`crew` (
  `crew_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(15) NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  `activity_area` VARCHAR(255) NULL DEFAULT NULL,
  `crew_loc` TINYBLOB NULL DEFAULT NULL,
  `max_participant_cnt` INT NOT NULL,
  PRIMARY KEY (`crew_id`),
  INDEX `FKfr9lbyqf1thmb578fbb04wk6c` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKfr9lbyqf1thmb578fbb04wk6c`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`calendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`calendar` (
  `calendar_id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `schedule_date` DATETIME NULL DEFAULT NULL,
  `crew_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`calendar_id`),
  INDEX `FKql6kpo0k3yeuutwwfwmx2j74i` (`crew_id` ASC) VISIBLE,
  INDEX `FK4xr1o686dphnmfq2ehy0d166` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK4xr1o686dphnmfq2ehy0d166`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`),
  CONSTRAINT `FKql6kpo0k3yeuutwwfwmx2j74i`
    FOREIGN KEY (`crew_id`)
    REFERENCES `weplog`.`crew` (`crew_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`challenge_ranking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`challenge_ranking` (
  `challenge_ranking_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `contribution` DOUBLE NULL DEFAULT NULL,
  `ranking` INT NULL DEFAULT NULL,
  `challenge_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`challenge_ranking_id`),
  INDEX `FK95xkk1cu1f21b2b6ugwlfl4xm` (`challenge_id` ASC) VISIBLE,
  INDEX `FKn7pns8vrwejtiaflcg7pm6pv` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK95xkk1cu1f21b2b6ugwlfl4xm`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `weplog`.`challenge` (`challenge_id`),
  CONSTRAINT `FKn7pns8vrwejtiaflcg7pm6pv`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`plogging`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`plogging` (
  `plogging_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `calorie` INT NULL DEFAULT NULL,
  `cert_flag` BIT(1) NULL DEFAULT NULL,
  `cert_image_url` VARCHAR(255) NULL DEFAULT NULL,
  `distance` INT NULL DEFAULT NULL,
  `share_image_url` VARCHAR(255) NULL DEFAULT NULL,
  `start_lat` VARCHAR(15) NULL DEFAULT NULL,
  `start_lng` VARCHAR(15) NULL DEFAULT NULL,
  `start_loc` VARCHAR(20) NULL DEFAULT NULL,
  `time` INT NULL DEFAULT NULL,
  `challenge_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`plogging_id`),
  INDEX `FK9a55ddccc6o9b8dckm0jxi5pq` (`challenge_id` ASC) VISIBLE,
  INDEX `FKq69whdj7nljtr7qci6t563fxo` (`member_id` ASC) VISIBLE,
  INDEX `plogging_end_time` (`created_date` ASC) VISIBLE,
  CONSTRAINT `FK9a55ddccc6o9b8dckm0jxi5pq`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `weplog`.`challenge` (`challenge_id`),
  CONSTRAINT `FKq69whdj7nljtr7qci6t563fxo`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`coordinate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`coordinate` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `plogging_loc` POINT NOT NULL,
  `plogging_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKc3pnh0jy214rkojjlk4afms0v` (`plogging_id` ASC) VISIBLE,
  SPATIAL INDEX `near_plogging_loc` (`plogging_loc`) VISIBLE,
  CONSTRAINT `FKc3pnh0jy214rkojjlk4afms0v`
    FOREIGN KEY (`plogging_id`)
    REFERENCES `weplog`.`plogging` (`plogging_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`crew_limit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`crew_limit` (
  `crew_limit_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `max_participant_cnt` INT NULL DEFAULT NULL,
  PRIMARY KEY (`crew_limit_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`garbage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`garbage` (
  `garbage_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `lat` DOUBLE NULL DEFAULT NULL,
  `lng` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`garbage_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1518
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`join_waiting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`join_waiting` (
  `join_waiting_id` BIGINT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(10) NULL DEFAULT NULL,
  `profile_image_url` VARCHAR(255) NULL DEFAULT NULL,
  `crew_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`join_waiting_id`),
  UNIQUE INDEX `UK_9u9x97j3jlon69yixub2n7l1q` (`nickname` ASC) VISIBLE,
  INDEX `FKi84wg2xnlm7sc6k1rowi8xbf0` (`crew_id` ASC) VISIBLE,
  INDEX `FKtog0lxbspyva83787hipsnar5` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKi84wg2xnlm7sc6k1rowi8xbf0`
    FOREIGN KEY (`crew_id`)
    REFERENCES `weplog`.`crew` (`crew_id`),
  CONSTRAINT `FKtog0lxbspyva83787hipsnar5`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`member_achievement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`member_achievement` (
  `member_achievement_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `complete_flag` BIT(1) NULL DEFAULT NULL,
  `progress` INT NULL DEFAULT NULL,
  `achievement_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`member_achievement_id`),
  INDEX `FKqg0ihr3d0c7ff67oa7r6pdiej` (`achievement_id` ASC) VISIBLE,
  INDEX `FKjvb236q9g873en441229sh2oa` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKjvb236q9g873en441229sh2oa`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`),
  CONSTRAINT `FKqg0ihr3d0c7ff67oa7r6pdiej`
    FOREIGN KEY (`achievement_id`)
    REFERENCES `weplog`.`achievement` (`achievement_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`member_challenge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`member_challenge` (
  `member_challenging_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `challenge_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`member_challenging_id`),
  INDEX `FKh9n4f0bidmjun3fvk2jp5netm` (`challenge_id` ASC) VISIBLE,
  INDEX `FK9x810nqdrhsdpp78017y3kqhe` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK9x810nqdrhsdpp78017y3kqhe`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`),
  CONSTRAINT `FKh9n4f0bidmjun3fvk2jp5netm`
    FOREIGN KEY (`challenge_id`)
    REFERENCES `weplog`.`challenge` (`challenge_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`member_crew`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`member_crew` (
  `member_crew_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(15) NULL DEFAULT NULL,
  `crew_id` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  `nickname` VARCHAR(10) NULL DEFAULT NULL,
  `profile_image_url` VARCHAR(255) NULL DEFAULT NULL,
  `total_cnt` INT NOT NULL,
  `total_distance` BIGINT NOT NULL,
  `total_time` BIGINT NOT NULL,
  PRIMARY KEY (`member_crew_id`),
  UNIQUE INDEX `UK_296b15g4kuohrxpitnr03qo79` (`nickname` ASC) VISIBLE,
  INDEX `FKi2oekx6c0tahgtowvdh1px301` (`crew_id` ASC) VISIBLE,
  INDEX `FKfg1jdue9i303t7cu6oya1cof9` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKfg1jdue9i303t7cu6oya1cof9`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`),
  CONSTRAINT `FKi2oekx6c0tahgtowvdh1px301`
    FOREIGN KEY (`crew_id`)
    REFERENCES `weplog`.`crew` (`crew_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`member_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`member_detail` (
  `member_detail_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `challenge_cnt` INT NULL DEFAULT NULL,
  `distance` BIGINT NULL DEFAULT NULL,
  `plogging_cnt` INT NULL DEFAULT NULL,
  `point` INT NULL DEFAULT NULL,
  `profile_image_url` VARCHAR(255) NULL DEFAULT NULL,
  `time` BIGINT NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  PRIMARY KEY (`member_detail_id`),
  INDEX `FK5b6i0af8bru3xdg80i7ieeokh` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK5b6i0af8bru3xdg80i7ieeokh`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`pet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`pet` (
  `pet_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `category` VARCHAR(20) NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `file_url` VARCHAR(255) NULL DEFAULT NULL,
  `level` INT NULL DEFAULT NULL,
  `max_exp` INT NULL DEFAULT NULL,
  PRIMARY KEY (`pet_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`member_pet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`member_pet` (
  `member_pet_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `current_exp` INT NULL DEFAULT NULL,
  `current_level` INT NULL DEFAULT NULL,
  `file_url` VARCHAR(255) NULL DEFAULT NULL,
  `image_level` INT NULL DEFAULT NULL,
  `max_exp` INT NULL DEFAULT NULL,
  `name` VARCHAR(10) NULL DEFAULT NULL,
  `member_id` BINARY(16) NULL DEFAULT NULL,
  `pet_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`member_pet_id`),
  INDEX `FKh69csxv4kadtwsjh8keqegw89` (`member_id` ASC) VISIBLE,
  INDEX `FKrof3gtc7lpilhuglaacxtmjcp` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `FKh69csxv4kadtwsjh8keqegw89`
    FOREIGN KEY (`member_id`)
    REFERENCES `weplog`.`member` (`member_id`),
  CONSTRAINT `FKrof3gtc7lpilhuglaacxtmjcp`
    FOREIGN KEY (`pet_id`)
    REFERENCES `weplog`.`pet` (`pet_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `weplog`.`pet_limit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weplog`.`pet_limit` (
  `pet_limit_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME NULL DEFAULT NULL,
  `modified_date` DATETIME NULL DEFAULT NULL,
  `max_level` INT NULL DEFAULT NULL,
  `max_pet_cnt` INT NULL DEFAULT NULL,
  PRIMARY KEY (`pet_limit_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `weplog` ;

-- -----------------------------------------------------
-- procedure getSquarePoint
-- -----------------------------------------------------

DELIMITER $$
USE `weplog`$$
CREATE DEFINER=`ssafy`@`%` PROCEDURE `getSquarePoint`(IN lon DOUBLE, IN lat DOUBLE, IN mbr_length INT)
BEGIN
	# 초반에 시간 초과안한 테이블 결과 저장 후 그거 이용 datetime 인덱스 걸고 계산 후 그 id값 들고 
    
    
	SET @lon = lon;
	SET @lat = lat;
 
	SET @MBR_length = mbr_length;
 
	SET @lon_diff = @MBR_length / 2 / ST_DISTANCE_SPHERE(POINT(@lon, @lat), POINT(@lon + IF(@lon < 0, 1, -1), @lat));
	SET @lat_diff = @MBR_length / 2 / ST_DISTANCE_SPHERE(POINT(@lon, @lat), POINT(@lon, @lat + IF(@lat < 0, 1, -1)));
    
    SET @diagonal = CONCAT('LINESTRING(', @lon -  IF(@lon < 0, 1, -1) * @lon_diff, ' ', @lat -  IF(@lon < 0, 1, -1) * @lat_diff, ',', @lon +  IF(@lon < 0, 1, -1) * @lon_diff, ' ', @lat +  IF(@lon < 0, 1, -1) * @lat_diff, ')');
 
    SELECT *
	FROM coordinate FORCE INDEX FOR JOIN (`near_plogging_loc`)
	WHERE plogging_id IN (select plogging_id 
    FROM plogging 
    WHERE created_date >= DATE_SUB(now(), INTERVAL 20 MINUTE)) AND MBRCONTAINS(ST_LINESTRINGFROMTEXT(@diagonal, 3857, 'axis-order=long-lat'), plogging_loc);
    
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
