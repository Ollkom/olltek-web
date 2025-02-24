"use client";
import { useState, useRef } from "react";
import { Typography, Video } from "@/components/ui";

const LargeVideo = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { data, fontInter } = props;
  const { description, title, video, poster } = data;
  const videoUrl = video?.data?.attributes?.url;
  const posterUrl = poster?.data?.attributes?.url;
  const videoRef = useRef(null);
  const handleToggle = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };
  return (
    <>
      <section className="py-12 md:py-24 bg-[#F4F8FF]">
        <div className="container-custom px-5 md:px-0">
          <div className="text-center">
            {title && (
              <Typography variant="gradient" className="tracking-widest">
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="heading1"
                className={`md:w-[800px] mx-auto ${fontInter.className}`}
              >
                {description}
              </Typography>
            )}
          </div>

          {video?.data && (
            <div className="relative">
              <Video
                videoUrl={videoUrl}
                autoPlay={isPlaying}
                ref={videoRef}
                className="rounded-3xl"
                isMuted={false}
                poster={posterUrl}
              />
              <button
                className="w-20 h-20 absolute top-1/2 left-0 right-0 mx-auto transform -translate-y-1/2 z-30 rounded-full md:w-36 md:h-36 border-4 border-white"
                onClick={handleToggle}
              >
                {/* Render play or pause icon based on isPlaying state */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10 md:w-20 md:h-20 text-white mx-auto"
                >
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LargeVideo;
