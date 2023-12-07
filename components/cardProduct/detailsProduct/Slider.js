"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import classes from "./Slider.module.css";

function ThumbnailPlugin(mainRef) {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }
        function addActive(idx) {
            slider.slides[idx].classList.add("active");
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
            });
        });
    };
}

export default function Slider(props) {
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
    });
    const [thumbnailRef] = useKeenSlider(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
            breakpoints: {
                "(max-width: 55rem)": {
                    slides: {
                        perView: 3,
                        spacing: 5,
                    },
                },
            },
        },
        [ThumbnailPlugin(instanceRef)]
    );

    return (
        <>
            <div ref={sliderRef} className={`keen-slider ${classes.slider1}`}>
                {props.images.map((img, index) => {
                    return (
                        <div
                            className="keen-slider__slide number-slide"
                            key={index}
                        >
                            <img src={img} alt="" />
                        </div>
                    );
                })}
            </div>

            <div
                ref={thumbnailRef}
                className={`keen-slider thumbnail ${classes.slider2}`}
            >
                {props.images.map((img, index) => {
                    return (
                        <div
                            className="keen-slider__slide number-slide"
                            key={index}
                        >
                            <img src={img} alt="" />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
