import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  keyUrl?: string;
  persistOnRefresh?: boolean;
  urlValue?: string;
  variant?: 'default' | 'blue' | 'large';
}

export type { ModalProps };

const OXMModal: React.FC<ModalProps> = ({ isOpen, onClose, children, keyUrl, persistOnRefresh = false, urlValue, variant = 'default' }) => {
  // Bloque le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      // Sauvegarde la position de scroll actuelle
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaure le scroll quand la modal se ferme
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handlePopState = () => {
      if (persistOnRefresh && keyUrl && urlValue) {
        const params = new URLSearchParams(window.location.search);
        if (params.get(keyUrl) !== urlValue) {
          onClose();
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [persistOnRefresh, keyUrl, urlValue, onClose]);

  const handleClose = () => {
    if (persistOnRefresh && keyUrl) {
      const url = new URL(window.location.href);
      url.searchParams.delete(keyUrl);
      window.history.replaceState({}, '', url.toString());
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const content = (
    <div className="oxm-modal-backdrop" onClick={handleClose}>
      <div className={`oxm-modal ${variant === 'blue' ? 'oxm-modal--blue' : ''} ${variant === 'large' ? 'oxm-modal--large' : ''}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default OXMModal;