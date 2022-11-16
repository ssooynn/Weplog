package com.ssafy.achievementservice.dto.response;

import com.ssafy.achievementservice.domain.achievement.Achievement;
import com.ssafy.achievementservice.domain.achievement.AchievementType;
import com.ssafy.achievementservice.domain.memberachievement.MemberAchievement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberAchievementDto {

    private Long memberAchievementId;
    private Integer progress;
    private Double progressRate;
    private Boolean completeFlag;

    private Long achievementId;
    private AchievementType type;
    private Integer level;
    private Integer goal;
    private String name;
    private String imageUrl;

    public static MemberAchievementDto from(MemberAchievement memberAchievement) {
        Achievement achievement = memberAchievement.getAchievement();

        return MemberAchievementDto.builder()
                .memberAchievementId(memberAchievement.getId())
                .progress(memberAchievement.getProgress())
                .progressRate(Double.valueOf((memberAchievement.getProgress() / achievement.getGoal()) * 100))
                .completeFlag(memberAchievement.getCompleteFlag())
                .achievementId(achievement.getId())
                .type(achievement.getType())
                .level(achievement.getLevel())
                .goal(achievement.getGoal())
                .name(achievement.getName())
                .imageUrl(memberAchievement.getCompleteFlag() ? achievement.getCompleteImageUrl() : achievement.getImageUrl())
                .build();
    }
}
