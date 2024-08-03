// CustomLayout.js
import React from 'react';

import backgroundImage from '../static/images/bg-image3.jpg';

const CustomLayout = ({ children }) => {
  const layoutStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div style={layoutStyle}>
      <section style={{opacity:".75"}}>
        {children}
      </section>

    </div>
  );
};

export default CustomLayout;
