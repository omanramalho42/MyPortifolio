import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([
    // {
    //   title: 'Web Development',
    //   description: 'i am a good web Developer',
    //   imgUrl: images.about01,
    // },
    // {
    //   title: 'Web Design',
    //   description: 'i am a good Web Design',
    //   imgUrl: images.about02,
    // },
    // {
    //   title: 'UI/UX',
    //   description: 'i am a good web Developer',
    //   imgUrl: images.about03,
    // },
    // {
    //   title: 'Web Animations',
    //   description: 'i am a good web animations',
    //   imgUrl: images.about04,
    // }
]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Eu sei que <span> ótimos profissionais são</span>
        <br />meios para <span> Bons negócios</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);