import React from 'react';
import 'styles/Home/body_home.css';

const HeroSection = ({ image, title, description }) => {
    return (
        <div className="hero-section">
            <img
                src={image}
                alt="Hero Banner"
                className="hero-image"
            />
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-description">{description}</p>
                    <div className="hero-buttons">
                        <button className="hero-button play-button">재생</button>
                        <button className="hero-button info-button">상세 정보</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
