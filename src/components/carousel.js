import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DynamicCarousel = ({ data, className }) => {
  const [elapsedTimes, setElapsedTimes] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay:true
  };

  useEffect(() => {
    const updateElapsedTimes = () => {
      const newElapsedTimes = data.map((item) => {
        const startDate = item.startDate.toDate();
        const lastPledgeDate = item.lastPledgeDate ? item.lastPledgeDate.toDate() : new Date();
        const diff = lastPledgeDate - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return { days, hours, minutes, seconds };
      });

      setElapsedTimes(newElapsedTimes);
    };

    updateElapsedTimes();
    const intervalId = setInterval(updateElapsedTimes, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <div className={className}>
      <Slider {...settings} >
        {data.map((item, index) => (
          <div key={index}>
            <h1 className="text-[14px] font-light mb-2">{`I have remained free from ${item.substance} for`}</h1>
            {elapsedTimes[index] && (
              <div>
                <ProgressBar label="days" value={elapsedTimes[index].days} maxValue={365} color="#4F46E5" />
                <ProgressBar label="hours" value={elapsedTimes[index].hours} maxValue={24} color="#2563EB" />
                <ProgressBar label="minutes" value={elapsedTimes[index].minutes} maxValue={60} color="#38BDF8" />
                <ProgressBar label="seconds" value={elapsedTimes[index].seconds} maxValue={60} color="#10B981" />
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DynamicCarousel;

const ProgressBar = ({ label, value, maxValue, color }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="my-1">
      <div
        className="relative w-full h-9 rounded-[2px] overflow-hidden"
        style={{ backgroundColor: `${color}33` }}
      >
        <div
          className="h-full rounded-[2px]"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        >
          <span className="absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold text-white">
            {`${value} ${label}`}
          </span>
        </div>
      </div>
    </div>
  );
};
