package com.ssafy.achievementservice.domain.memberachievement;


import com.ssafy.achievementservice.domain.achievement.Achievement;
import com.ssafy.achievementservice.domain.member.Member;
import com.ssafy.achievementservice.global.common.base.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class MemberAchievement extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_achievement_id")
    private Long id;

    private Integer progress;
    private Boolean completeFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;

    public static List<MemberAchievement> createFirstList(List<Achievement> achievementList, Member member) {
        List<MemberAchievement> memberAchievementList = new ArrayList<>();

        for (Achievement achievement : achievementList) {
            memberAchievementList.add(createPerAchievement(achievement, member));
        }

        return memberAchievementList;
    }

    public static MemberAchievement createPerAchievement(Achievement achievement, Member member) {
        return MemberAchievement.builder()
                .progress(0)
                .completeFlag(false)
                .member(member)
                .achievement(achievement)
                .build();
    }

    public void updateDistance(Integer distance) {
        // 진행도가 목표치를 넘었으면 완료 처리
        if (this.progress + distance >= this.achievement.getGoal()) {
            this.completeFlag = true;
            this.progress = this.achievement.getGoal();
        } else {
            this.progress += distance;
        }
    }

    public void updateTime(Integer time) {
        // 진행도가 목표치를 넘었으면 완료 처리
        if (this.progress + time >= this.achievement.getGoal()) {
            this.completeFlag = true;
            this.progress = this.achievement.getGoal();
        } else {
            this.progress += time;
        }
    }

    public void updateFloggingCnt() {
        // 진행도가 목표치를 넘었으면 완료 처리
        if (this.progress + 1 >= this.achievement.getGoal()) {
            this.completeFlag = true;
            this.progress = this.achievement.getGoal();
        } else {
            this.progress += 1;
        }
    }

    public void updateGroupFloggingCnt() {
        // 진행도가 목표치를 넘었으면 완료 처리
        if (this.progress + 1 >= this.achievement.getGoal()) {
            this.completeFlag = true;
            this.progress = this.achievement.getGoal();
        } else {
            this.progress += 1;
        }
    }
}
