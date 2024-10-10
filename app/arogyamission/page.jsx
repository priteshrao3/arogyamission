'use client'
import { FaAngleDoubleRight } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';


const truncateDescription = (description, maxWords) => {
  const words = description.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description;
};

function ArogyaMission() {
  const [salesData, setSalesData] = useState(null);
  const [ setTimeLeft] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.bkarogyam.com/lapisarogyamission/');
        setSalesData(response.data[0]);
        setTimeLeft(calculateTimeLeft(response.data[0].end_time));
      } catch (error) {
        console.error('Error fetching sales page data:', error);
      }
    };

    fetchData();

    const timer = setInterval(() => {
      if (salesData) {
        setTimeLeft(calculateTimeLeft(salesData.end_time));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [salesData]);

  const calculateTimeLeft = (endTime) => {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  if (!salesData) {
    return <div>Loading...</div>;
  }

  const getEmbedLink = (link) => {
    return link.replace('watch?v=', 'embed/');
  };


  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  
  return (
    <div className='bg-white'>
      <div className='bg-blue-950'>
        <p className='text-5xl text-white font-bold px-7 pt-7 text-center'>
          <span className='text-yellow-400'>{salesData.title}</span>
        </p>

        <p className='text-2xl text-white font-bold text-center italic mt-5'>
  {ReactHtmlParser(truncateDescription(salesData.heading))}
</p>
        
        <p className='text-sm md:px-40 text-white font-bold text-center italic mt-5'>
          {truncateDescription(salesData.sort_description)}
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:px-20 mt-5">
          {/* Left Column */}
          <div className="border p-6 rounded shadow text-center">
            <h2 className='text-2xl font-bold mb-4 text-white'>📢 {salesData.seats_and_video_sections[0].title}</h2>
            <p className='text-xl mb-2 text-yellow-500 font-bold'>{salesData.seats_and_video_sections[0].offers}</p>
            <button className='bg-green-500 text-white px-5 py-1 rounded mb-4 mt-3'>
              {salesData.book_now_text}
            </button>
            <p className='text-2xl font-bold mb-2'>Date & Time - {salesData.seats_and_video_sections[0].datetime_remaining}</p>
            <p className='text-xl font-bold'>{truncateDescription(salesData.sort_description, 30)}</p>
          </div>

          {/* Right Column with Embedded YouTube Video */}
          <iframe
  width="100%"
  height="350"
  src={getEmbedLink(salesData.seats_and_video_sections[0].video_link)}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className='rounded mb-2'
></iframe>
        </div>


        {/* What You Will Learn Section */}
<div className='p-6 bg-white'>
  <h2 className='text-3xl font-bold text-black mb-4 text-center'>What You Will Learn in This Workshop</h2>
  <ul className='list-none space-y-3 px-28'>
    {salesData.what_you_will_learn.map((item, index) => (
      <li key={index} className='flex items-start text-sm text-black'>
        {/* Forward Icon */}
        <FaAngleDoubleRight className="w-6 h-6 text-green-500 mr-2" aria-hidden="true" />
        <div>
          <strong>{item.title}:</strong> {item.description}
        </div>
      </li>
    ))}
  </ul>
</div>


        {/* testtt */}
        <div className='text-center py-5'>
            {salesData?.achiveing?.[0]?.achiving_content ? (
                <div 
                    className='px-40 p-5 text-xl font-bold' 
                    dangerouslySetInnerHTML={{ __html: salesData.achiveing[0].achiving_content }} 
                />
            ) : (
                <p className='px-40 p-5 text-xl font-bold'>No content available.</p>
            )}

            <button className='bg-green-500 text-white px-5 py-1 rounded mb-4 mt-3'>
                {salesData?.book_now_text || 'Book Now'}
            </button>
        </div>
        

        {/* our achivement */}
        <div className='text-center bg-black py-20 px-10'>
    <p className="text-5xl font-bold mb-10">Our Achievements of 20 Years Experience</p>
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="border-r last:border-r-0 pr-4">
            <p className="text-3xl font-bold">{salesData.our_achievements[0]?.Experience_in_years}</p>
        </div>
        <div className="border-r last:border-r-0 pr-4">
            <p className="text-3xl font-bold">{salesData.our_achievements[0]?.patent_treated}</p>
        </div>
        <div className="border-r last:border-r-0 pr-4">
            <p className="text-3xl font-bold">{salesData.our_achievements[0]?.sticfied_patents}</p>
        </div>
        <div className="border-r last:border-r-0 pr-4">
            <p className="text-3xl font-bold">{salesData.our_achievements[0]?.contries}</p>
        </div>
        <div>
            <p className="text-3xl font-bold">{salesData.our_achievements[0]?.languages}</p>
        </div>
    </div>
</div>



 {/* About me */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-14 bg-white px-20'>
    {/* Left Column: Content */}
    <div className="text-left">
        <h2 className="text-3xl font-bold text-black">{salesData.aboutme.name}</h2>
        <p className="text-lg font-semibold mb-4 text-black mt-3">{salesData.aboutme.title}</p>
        <div 
            className="text-lg mb-4 text-black" 
            dangerouslySetInnerHTML={{ __html: salesData.aboutme.description }} // Render HTML description
        />
    </div>

    {/* Right Column: Image */}
    <div className="flex justify-center items-center">
        <img 
            src={salesData.aboutme.image} // Use image from salesData
            alt={salesData.aboutme.name} // Use name for the alt attribute
            className="w-auto h-auto rounded-lg shadow-lg" // Adjust width as needed
        />
    </div>
</div>




{/* Social Media Reviews */}
<div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white px-20 pb-14'>
    {salesData.social_patent_reviews.map((review, index) => (
        <div key={index} className="flex justify-center items-center">
            <img 
                src={review.image} // Dynamically load images from API
                alt={`Social Review ${index + 1}`} // Use dynamic alt text
                className="w-auto h-auto rounded-lg shadow-lg" // Adjust width and height as needed
            />
        </div>
    ))}
</div>



{/*center slider  */}
<div className='bg-white'>
      <Swiper
        pagination={pagination}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
      {salesData.slider_image.map((imageData, index) => (
      <SwiperSlide key={index}>
        <img 
          src={imageData.image} // Dynamically load images from API
          alt={`Slide ${index + 1}`} // Use dynamic alt text
          className="w-full h-auto object-cover" 
        />
      </SwiperSlide>
    ))}

      </Swiper>

      <style jsx>{`
        .mySwiper {
          width: 100%;
          height: 300px; /* Set a fixed height for the Swiper */
        }

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          background: #fff;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .swiper-pagination-bullet {
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          color: #000;
          opacity: 1;
          background: rgba(0, 0, 0, 0.2);
        }

        .swiper-pagination-bullet-active {
          color: #fff;
          background: #007aff;
        }
      `}</style>
    </div>




    <div className="py-20 bg-white">
  <p className='text-black text-5xl text-center'>See What Others Talk About Us</p>

  {/* Grid Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    {/* Left Column: Image */}
    <div className="flex justify-center">
      <img 
        src="/m0mjm_536_ScreenshotCapture20240202141511.webp" 
        alt="Deepak Bajaj" 
        className="w-auto h-auto rounded-lg shadow-lg" // Adjust width as needed
      />
    </div>

    {/* Right Column: Image */}
    <div className="flex justify-center">
      <img 
        src="/m0mjm_536_ScreenshotCapture20240202141511.webp" 
        alt="Deepak Bajaj" 
        className="w-auto h-auto rounded-lg shadow-lg" // Adjust width as needed
      />
    </div>
  </div>
</div>

<div className="py-20 bg-white px-20">
  <p className='text-black text-2xl text-center mb-8'>Watch Our Videos</p>

  {/* Grid Container */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Video 1 */}
    <div className="flex flex-col items-center">
      <iframe
        width="100%"
        height="300" // Adjust height as needed
        src="https://www.youtube.com/embed/ZVNb45H3ITw" // Embed link
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className='rounded-xl mb-2'
      ></iframe>
      <p className="text-lg font-semibold text-black">Veteran Direct Seller</p>
      <p className="text-black">Sureder Vats</p>
      <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
    </div>

    {/* Video 2 */}
    <div className="flex flex-col items-center">
      <iframe
        width="100%"
        height="300" // Adjust height as needed
        src="https://www.youtube.com/embed/ZVNb45H3ITw" // Embed link
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className='rounded-xl mb-2'
      ></iframe>
      <p className="text-lg font-semibold text-black">Veteran Direct Seller</p>
      <p className="text-black">Sureder Vats</p>
      <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
    </div>

    {/* Video 3 */}
    <div className="flex flex-col items-center">
      <iframe
        width="100%"
        height="300" // Adjust height as needed
        src="https://www.youtube.com/embed/ZVNb45H3ITw" // Embed link
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className='rounded-xl mb-2'
      ></iframe>
      <p className="text-lg font-semibold text-black">Veteran Direct Seller</p>
      <p className="text-black">Sureder Vats</p>
      <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
    </div>

    {/* Video 4 */}
    <div className="flex flex-col items-center">
      <iframe
        width="100%"
        height="300" // Adjust height as needed
        src="https://www.youtube.com/embed/ZVNb45H3ITw" // Embed link
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className='rounded-xl mb-2'
      ></iframe>
      <p className="text-lg font-semibold text-black">Veteran Direct Seller</p>
      <p className="text-black">Sureder Vats</p>
      <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
    </div>
  </div>
</div>


<div className='text-center py-5'>
      <h2 className='text-5xl font-bold mb-4'>Only For Limited People</h2>
      <p className='text-2xl mb-2 text-yellow-400'>Once the seats become full, registration will close.</p>

      {/* <div className='text-3xl font-bold mb-4'>
        <span>{String(countdown.hours).padStart(2, '0')}:</span>
        <span>{String(countdown.minutes).padStart(2, '0')}:</span>
        <span>{String(countdown.seconds).padStart(2, '0')}</span>
      </div> */}

<blockquote className='italic mb-4'>
  “A real decision is measured by the fact that you&apos;ve taken a new action. If there&apos;s no action, you haven&apos;t truly decided.” — Tony Robbins.
</blockquote>
<button className='bg-green-500 text-white px-5 py-2 rounded mb-4 mt-3'>
  Reserve Your Spot Now
</button>

<p className='text-lg font-bold'>Register NOW and Unlock Bonuses Worth Rs. 5,000!</p>

    </div>



    <div className='bg-white py-8 px-4'>
      <h2 className='text-5xl text-black text-center font-bold mb-6'>
        As a Special 2 Bonuses Worth Rs. 5000 During Live Training You Will Get... :
      </h2>

      <div className='bg-white py-8 px-4'>
      <h2 className='text-5xl text-black text-center font-bold mb-6'>
        As a Special 2 Bonuses Worth Rs. 5000 During Live Training You Will Get... :
      </h2>

      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='p-6 border border-gray-300 rounded shadow-lg'>
          <h3 className='text-3xl text-green-500 font-bold mb-2'>SPECIAL BONUS 1</h3>
          <h4 className='text-xl font-semibold mb-4'>EPIC Workshop</h4>
          <p className='text-lg mb-4'>
            Practical Solutions to your 4 Biggest Challenges:
          </p>
          <ul className='list-disc list-inside mb-4'>
            <li>1. Excitement</li>
            <li>2. Procrastination</li>
            <li>3. Implementation</li>
            <li>4. Consistency</li>
          </ul>
          <p className='text-lg'>
            Set clear goals, manage your time, find your passion, create action plans, and develop habits to overcome challenges related to excitement, procrastination, implementation, and consistency in your endeavors.
          </p>
        </div>

        <div className='p-6 border border-gray-300 rounded shadow-lg'>
          <h3 className='text-3xl text-green-500 font-bold mb-2'>SPECIAL BONUS 2</h3>
          <h4 className='text-xl font-semibold mb-4'>GPS System for Massive Success</h4>
          <p className='text-lg mb-4'>
            Our &quot;GPS System for Massive Success E-Workbook&quot; is the most powerful tool for anyone looking to create a successful and fulfilling life on their own terms, available in both Hindi & English.
          </p>
          <p className='text-lg'>
            This is your ultimate guide to navigating your path to success. It offers a step-by-step roadmap to help you achieve your goals and realize your dreams, no matter where you are in life.
          </p>
        </div>
      </div>
    </div>
    </div>



      </div>
    </div>
  );
}

export default ArogyaMission;
