'use client';

import { useState } from 'react';
import FormShell from './FormShell';
import { useToast } from './Toast';

export default function ReportForm() {
  const toast = useToast();
  const [photos, setPhotos] = useState(0);
  const [loc, setLoc] = useState('');

  const useMyLocation = () => {
    if (!navigator.geolocation) return toast('Location is not available on this device.');
    navigator.geolocation.getCurrentPosition(
      (p) => setLoc(`GPS ${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`),
      () => toast('Location permission was not granted. Please type the location.'),
    );
  };

  return (
    <FormShell kind="report">
      <div className="field">
        <span className="lbl">What kind of animal?</span>
        <div className="opts">
          <label className="opt"><input type="radio" name="kind" value="Dog" required /><span>Dog</span></label>
          <label className="opt"><input type="radio" name="kind" value="Cat" /><span>Cat</span></label>
          <label className="opt"><input type="radio" name="kind" value="Other" /><span>Other</span></label>
        </div>
      </div>
      <div className="field">
        <span className="lbl">What&apos;s happening?</span>
        <div className="opts">
          <label className="opt"><input type="radio" name="situation" value="Injured" required /><span>Injured</span></label>
          <label className="opt"><input type="radio" name="situation" value="Abandoned" /><span>Abandoned</span></label>
          <label className="opt"><input type="radio" name="situation" value="Sick or weak" /><span>Sick or weak</span></label>
          <label className="opt"><input type="radio" name="situation" value="Being mistreated" /><span>Being mistreated</span></label>
        </div>
      </div>
      <div className="field">
        <label htmlFor="re-loc">Location</label>
        <input id="re-loc" name="location" required placeholder="Street, area and nearby landmark" value={loc} onChange={(e) => setLoc(e.target.value)} />
        <button type="button" className="link" style={{ justifySelf: 'start', fontSize: '.88rem', marginTop: 4 }} onClick={useMyLocation}>
          Use my current location
        </button>
      </div>
      <div className="field">
        <span className="lbl">Photos</span>
        <label className="upload" htmlFor="re-photo">
          <span className="ico">
            <svg viewBox="0 0 32 32">
              <rect x="4" y="8" width="24" height="18" rx="3" />
              <circle cx="16" cy="17" r="4.5" />
              <path d="M11 8l2-3h6l2 3" />
            </svg>
          </span>
          <span>
            <b>{photos ? `${photos} ${photos === 1 ? 'photo' : 'photos'} added` : 'Add photos'}</b>
            <small>Up to 5 images</small>
          </span>
        </label>
        <input id="re-photo" name="photos" className="sr" type="file" accept="image/*" multiple onChange={(e) => setPhotos(e.target.files?.length ?? 0)} />
      </div>
      <div className="field">
        <label htmlFor="re-desc">Describe the animal and situation</label>
        <textarea id="re-desc" name="description" required />
      </div>
      <div className="row2">
        <div className="field"><label htmlFor="re-name">Your name</label><input id="re-name" name="name" required /></div>
        <div className="field"><label htmlFor="re-phone">Phone or WhatsApp</label><input id="re-phone" name="phone" type="tel" required /></div>
      </div>
      <button className="btn btn-dark btn-block" type="submit">Send report</button>
    </FormShell>
  );
}
