"use client"
import React, { Fragment } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import classes from "./OurBrand.module.css"

const animation = { duration: 10000, easing: (t) => t };

const OurBrand = () => {
    const [sliderRef] = useKeenSlider({
        loop: true,
        renderMode: "performance",
        drag: false,
        slides: {
            perView: 8,
            spacing: 15,
        },
        breakpoints: {
            "(max-width: 65rem)": {
                slides: {
                    perView: 6,
                    spacing: 5,
                },
            },
            "(max-width: 45rem)": {
                slides: {
                    perView: 3,
                    spacing: 5,
                },
            },
        },
        created(s) {
            s.moveToIdx(5, true, animation);
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation);
        },
    });
    return (
        <Fragment>
            <section className="mainContainer py-8">
                <div className={classes.head}>
                    <p >علاماتنا التجارية</p>
                </div>
                <div
                    ref={sliderRef}
                    className={`keen-slider ${classes.section}`}
                >
                    <div className="keen-slider__slide">
                        <img src="/image/brand/1.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/2.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/3.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/4.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/5.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/6.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/7.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/8.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/9.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/10.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/11.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/12.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/13.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/14.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/15.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/16.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/17.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/18.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/19.jpg" alt="brand logo" />
                    </div>
                    <div className="keen-slider__slide">
                        <img src="/image/brand/20.jpg" alt="brand logo" />
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default OurBrand;
