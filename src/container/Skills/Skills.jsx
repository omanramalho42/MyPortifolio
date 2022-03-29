import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });

    
  }, []);

  console.log(`experiences 👨‍🎓`);
  console.log(experiences);
  console.log("skills: 🐱‍👤");
  console.log(skills);

  return (
    <>
      <h2 className="head-text">Habilidades & experiências</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map(({ icon, name, bgColor }) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: bgColor || 'transparent' }}
              >
                 <img src={urlFor(icon)} alt={name} />
              </div>
              <p className="p-text">{name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map(({ year, works }) => (
            <motion.div
              className="app__skills-exp-item"
              key={year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {works.map(({ name, company, desc }) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={name}
                      key={name}
                    >
                      <h4 className="bold-text">{name}</h4>
                      <p className="p-text">{company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);