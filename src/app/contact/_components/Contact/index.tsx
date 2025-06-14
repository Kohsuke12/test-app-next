"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import classes from './Contact.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    // 名前のバリデーション
    if (!formData.name.trim()) {
      newErrors.name = 'お名前は必須です。';
      isValid = false;
    } else if (formData.name.length > 30) {
      newErrors.name = 'お名前は30文字以内で入力してください';
      isValid = false;
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です。';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }

    // 本文のバリデーション
    if (!formData.message.trim()) {
      newErrors.message = '本文は必須です。';
      isValid = false;
    } else if (formData.message.length > 500) {
      newErrors.message = '本文は500文字以内で入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || '送信に失敗しました');
      }

      alert('送信しました');
      handleClear();
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setErrors({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>問合わせフォーム</h1>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <div className={classes.formGroup}>
          <label htmlFor="name" className={classes.label}>お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${classes.input} ${errors.name ? classes.errorInput : ''}`}
            disabled={isSubmitting}
          />
          {errors.name && <p className={classes.errorText}>{errors.name}</p>}
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="email" className={classes.label}>メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${classes.input} ${errors.email ? classes.errorInput : ''}`}
            disabled={isSubmitting}
          />
          {errors.email && <p className={classes.errorText}>{errors.email}</p>}
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="message" className={classes.label}>本文</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${classes.textarea} ${errors.message ? classes.errorInput : ''}`}
            rows={5}
            disabled={isSubmitting}
          />
          {errors.message && <p className={classes.errorText}>{errors.message}</p>}
        </div>

        <div className={classes.buttonContainer}>
          <button 
            type="submit" 
            className={classes.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>

          <button
            type="button"
            className={classes.clearButton}
            onClick={handleClear}
            disabled={isSubmitting}
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
}; 