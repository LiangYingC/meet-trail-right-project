import React from 'react';

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="flex wrap">
        <div className="flex footer-info">
          <div className="best-trail-web">
            <p>推薦登山步道網站</p>
            <ul className="flex">
              <li>
                <a href="">健行筆記</a>
              </li>
              <li>
                <a href="">台灣山林悠遊網</a>
              </li>
            </ul>
          </div>
          <div className="social-media">
            <p>製作者社群連結</p>
            <ul className="flex">
              <li>
                <a href="">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">© {thisYear} 選山步道 All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
