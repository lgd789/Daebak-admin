package com.admin.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "points_details")
@Getter
@Setter
public class PointsDetailsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pt_id")
    private Long ptId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "usage_amount", nullable = false)
    private BigDecimal usageAmount;

    @Column(name = "sub_total", nullable = false)
    private BigDecimal subTotal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private MemberEntity member;

    @Override
    public String toString() {
        return "PointsDetailsEntity{" +
                "ptId=" + ptId +
                ", memberId=" + memberId +
                ", date=" + date +
                ", description='" + description + '\'' +
                ", usageAmount=" + usageAmount +
                ", subTotal=" + subTotal +
                '}';
    }
}
