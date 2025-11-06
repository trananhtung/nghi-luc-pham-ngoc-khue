import React, {useMemo, useRef, useState, useCallback} from "react";

type Track = {
  title: string;
  src: string;
};

export default function AudioPlayer(): JSX.Element {
  const tracks: Track[] = useMemo(
    () => [
      {
        title: "00 - Lời nói đầu",
        src: "/audio/00-Lời nói đầu.mp3",
      },
      {
        title: "11 - Thế nào là yếu",
        src: "/audio/11-Thế nào là yếu.mp3",
      },
      {
        title: "12 - Những con thiêu thân",
        src: "/audio/12-Những con thiêu thân.mp3",
      },
      {
        title: "13 - Những cái chong chóng",
        src: "/audio/13-Những cái chong chóng.mp3",
      },
      {
        title: "14 - Những con vẹt",
        src: "/audio/14-Những con vẹt.mp3",
      },
      {
        title: "15 - Những bồ-nhìn",
        src: "/audio/15-Những bồ-nhìn.mp3",
      },
      {
        title: "16 - Cái tội yếu",
        src: "/audio/16-Cái tội yếu.mp3",
      },
      {
        title: "21 - Ba phép tu thân",
        src: "/audio/21-Ba phép tu thân.mp3",
      },
      {
        title: "22 - Luyện ý chí",
        src: "/audio/22-Luyện ý chí.mp3",
      },
      {
        title: "23 - Lập chí hướng",
        src: "/audio/23-Lập chí hướng.mp3",
      },
      {
        title: "24 - Bồi bổ xác thịt",
        src: "/audio/24-Bồi bổ xác thịt.mp3",
      },
      {
        title: "25 - Những con đường cụt",
        src: "/audio/25-Những con đường cụt.mp3",
      },
      {
        title: "31 - Nghị lực",
        src: "/audio/31-Nghị lực.mp3",
      },
      {
        title: "32 - Giác ngộ",
        src: "/audio/32-Giác ngộ.mp3",
      },
      {
        title: "33 - Khôi phục sức khỏe",
        src: "/audio/33-Khôi phục sức khỏe.mp3",
      },
      {
        title: "34 - Đi tìm nguồn sống",
        src: "/audio/34-Đi tìm nguồn sống.mp3",
      },
      {
        title: "35 - Giải phóng sinh lực",
        src: "/audio/35-Giải phóng sinh lực.mp3",
      },
      {
        title: "40 - Kết luận",
        src: "/audio/40-Kết luận.mp3",
      },
    ],
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onSelect = useCallback(
    async (index: number) => {
      setCurrentIndex(index);
      const audio = audioRef.current;
      if (!audio) return;
      // Load new source then play if previously playing
      audio.load();
      if (isPlaying) {
        try {
          await audio.play();
        } catch {
          // no-op
        }
      }
    },
    [isPlaying]
  );

  const onPlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // no-op
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const onEnded = useCallback(() => {
    const next = currentIndex + 1;
    if (next < tracks.length) {
      setCurrentIndex(next);
      const audio = audioRef.current;
      if (audio) {
        // After index state updates, reload and autoplay
        setTimeout(async () => {
          audio.load();
          try {
            await audio.play();
            setIsPlaying(true);
          } catch {
            // no-op
          }
        }, 0);
      }
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, tracks.length]);

  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Nghe sách nói</h3>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 260, flex: "1 1 300px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tracks.map((t, i) => (
              <li
                key={t.src}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: i === currentIndex ? "var(--ifm-color-emphasis-200)" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => onSelect(i)}
              >
                <span style={{ marginRight: 12 }}>{t.title}</span>
                {i === currentIndex ? (
                  <span style={{ fontSize: 12, opacity: 0.8 }}>Đang chọn</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: "2 1 400px", minWidth: 320 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
            <button className="button button--primary" onClick={onPlayPause}>
              {isPlaying ? "Tạm dừng" : "Phát"}
            </button>
            <span style={{ opacity: 0.8 }}>{tracks[currentIndex]?.title}</span>
          </div>
          <audio
            ref={audioRef}
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={onEnded}
            style={{ width: "100%" }}
          >
            <source src={tracks[currentIndex]?.src} type="audio/mpeg" />
            Trình duyệt của bạn không hỗ trợ audio.
          </audio>
        </div>
      </div>
    </div>
  );
}


