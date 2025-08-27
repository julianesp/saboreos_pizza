"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/components/Footer.module.scss";

const Footer = () => {
  const [menuOption, setMenuOptions] = useState(false);
  const [isClient, setIsClient] = useState(false); // Nuevo estado para detectar hidratación
  const menuRef = useRef(null);
  const flechaRef = useRef(null);


  const switchOptions = () => {
    setMenuOptions(!menuOption);
  };

  // useEffect para detectar cuando el componente se hidrata en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Solo ejecutar lógica del browser después de la hidratación
    if (!isClient) return;


    // Función para cerrar el menú cuando se hace clic fuera
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        flechaRef.current &&
        !flechaRef.current.contains(event.target)
      ) {
        setMenuOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isClient]); // Dependencia del estado isClient

  return (
    <footer className={styles.footer}>
      <button ref={flechaRef} className={styles.flecha} onClick={switchOptions}>
        <Image
          alt="Links to navigation"
          src="https://firebasestorage.googleapis.com/v0/b/neuraidev.appspot.com/o/images%2Fnext.png?alt=media&token=e66ac434-3360-4247-b1e1-aaf095c30a57"
          priority
          width={30}
          height={30}
        />
      </button>

      <article className={`${styles.description}`}>
        <Link href="/">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/neuraidev.appspot.com/o/images%2Flogo.png?alt=media&token=96ed73e2-f6fd-4daf-ad5d-4cb0690aa9fb"
            alt="neurai.dev"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </Link>
      </article>

      {/* Redes Sociales Flotantes - Solo se renderiza después de hidratación */}
      {isClient && (
        <article
          ref={menuRef}
          className={`${styles.redes} ${
            menuOption ? styles.open : styles.closed
          }`}
        >
          <ul>
            <li>
              <Link
                href="https://www.facebook.com/profile.php?id=100085485673809"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  alt="Facebook"
                  src="https://firebasestorage.googleapis.com/v0/b/neuraidev.appspot.com/o/images%2Fsocialmedia%2Ffacebook.png?alt=media&token=e719a37e-cb63-45ea-8535-ca23b6bdba35"
                  width={40}
                  height={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false} // Solo true para imágenes above-the-fold
                  loading="lazy"
                  quality={85} // Reduce de 100 a 85
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+MTMftoJJoNY6mHQvGgBFO15tquD7xZg="
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/julianrio95/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  alt="Instagram"
                  src="https://firebasestorage.googleapis.com/v0/b/neuraidev.appspot.com/o/images%2Fsocialmedia%2Finstagram.png?alt=media&token=dd5ed25b-1b37-4eaa-9467-a127ce8124b2"
                  width={40}
                  height={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false} // Solo true para imágenes above-the-fold
                  loading="lazy"
                  quality={85} // Reduce de 100 a 85
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+MTMftoJJoNY6mHQvGgBFO15tquD7xZg="
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/573174503604"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  alt="Whatsapp"
                  src="https://firebasestorage.googleapis.com/v0/b/neuraidev.appspot.com/o/images%2Fsocialmedia%2Fsocial.png?alt=media&token=8b2f56eb-ce82-412c-b883-f088a9bfa752"
                  width={40}
                  height={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false} // Solo true para imágenes above-the-fold
                  loading="lazy"
                  quality={85} // Reduce de 100 a 85
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+MTMftoJJoNY6mHQvGgBFO15tquD7xZg="
                />
              </Link>
            </li>
            <li className={styles.tiktok}>
              <Link
                href="https://www.tiktok.com/@julii1295?_t=8n2OQ52Q4aD&_r=1"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  alt="TikTok"
                  src="https://firebasestorage.googleapis.com/v0/b/neuraidev.appspot.com/o/images%2Fsocialmedia%2Ftik-tok.png?alt=media&token=421205be-9170-4b4c-b873-04f63c9d727f"
                  width={40}
                  height={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false} // Solo true para imágenes above-the-fold
                  loading="lazy"
                  quality={85} // Reduce de 100 a 85
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+MTMftoJJoNY6mHQvGgBFO15tquD7xZg="
                />
              </Link>
            </li>
          </ul>
        </article>
      )}
    </footer>
  );
};

export default Footer;
