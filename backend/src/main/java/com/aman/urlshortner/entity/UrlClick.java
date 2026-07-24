package com.aman.urlshortner.entity;

import jakarta.persistence.*;
        import lombok.*;

        import java.time.LocalDateTime;

@Entity
@Table(
        name = "url_clicks",
        indexes = {
                @Index(name = "idx_url_clicks_url_id", columnList = "url_id"),
                @Index(name = "idx_url_clicks_clicked_at", columnList = "clicked_at")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UrlClick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "url_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_url_clicks_url")
    )
    private Url url;

    @Column(name = "clicked_at", nullable = false)
    private LocalDateTime clickedAt;

    @PrePersist
    protected void onCreate() {
        if (clickedAt == null) {
            clickedAt = LocalDateTime.now();
        }
    }
}
