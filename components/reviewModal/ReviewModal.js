// ReviewModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa'; // Import the star icon
import Rating from 'react-rating-stars-component'; // Import the star rating component
import styles from './ReviewModal.module.css';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";

const ReviewModal = ({ isOpen, onClose ,product_slug,category_slug}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [cookies] = useCookies(['authToken']);
  const authToken = cookies.authToken;
  const router = useRouter();


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  // const handleSubmit = () => {
  //   console.log('Rating:', rating);
  //   console.log('Review Text:', reviewText);

    
  //   onClose();
  // };

  const handleSubmit = async () => {
    try {
      if (!rating ){
        alert("يجب تقييم المنتج");
        return
      }
      
      if (authToken){
        const response = await axios.post(
          `http://localhost:8000/api/products/${product_slug}/review/`,
          {
            rating: rating,
            comment: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.authToken}`, 
            },
          }
        );
        onClose();
      alert("تم تقييم المنتج بنجاح");
      }

      else{
        const redirectPath = `/subCategory/${category_slug}/${product_slug}`; 
        router.push(`/sign_in?redirect=${redirectPath}`);

      }
      
    } catch (error) {
      console.error('Error create review:', error);
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Write a Review"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalTopBar}>
          <FaTimes className={styles.closeIcon} onClick={onClose} />
        </div>
        <h2 className={styles.modalTitle}>
.أخبرنا عن رأيك في هذا المنتج</h2>
        <label className={styles.inputLabel}>
        تقييمك؟
          <Rating
            count={5}
            onChange={handleRatingChange}
            size={30}
            activeColor="#ffd700"
            emptyIcon={<FaStar className={styles.starIcon} />}
            filledIcon={<FaStar className={`${styles.starIcon} ${styles.filledStar}`} />}
          />
        </label>


        <label className={styles.inputLabel}>
        شارك تجربتك          
        
        <textarea
            value={reviewText}
            onChange={handleReviewTextChange}
            className={styles.textareaField}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.closeButton}>
            الغاء
          </button>
          <button onClick={handleSubmit} className={styles.submitButton}>
            حفظ
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
