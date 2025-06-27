   document.getElementById('registrationForm').addEventListener('submit', async function(event) {
       event.preventDefault();

       const formData = new FormData(this);
       
       // Kirim data ke Google Spreadsheet
       const response = await fetch('https://script.google.com/macros/s/AKfycbyk8yPsU5lD9RPZG1COgI4-tgVWi-Z8cCxzenlgABxCfV1p2hmxaWPvxx-3aLVwkERB/exec', {
           method: 'POST',
           body: JSON.stringify({
               fullName: formData.get('fullName'),
               whatsapp: formData.get('whatsapp'),
               schoolOrigin: formData.get('schoolOrigin'),
               infoSource: formData.get('infoSource'),
               class: formData.get('class'),
               subject1: formData.get('subject1'),
               subject2: formData.get('subject2'),
               paymentProofLink: '' // Placeholder for payment proof link
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       });

       // Upload bukti pembayaran ke Google Drive
       const paymentProof = formData.get('paymentProof');
       const driveFormData = new FormData();
       driveFormData.append('file', paymentProof);

       const driveResponse = await fetch('https://drive.google.com/drive/folders/1KN2_FYWM5m8lKuzT0eGLpkweHzs1hnGi?usp=sharing', {
           method: 'POST',
           body: driveFormData
       });

       const driveData = await driveResponse.json();
       const paymentProofLink = driveData.link; // Ambil link dari response

       // Update spreadsheet dengan link bukti pembayaran
       await fetch('https://script.google.com/macros/s/AKfycbyk8yPsU5lD9RPZG1COgI4-tgVWi-Z8cCxzenlgABxCfV1p2hmxaWPvxx-3aLVwkERB/exec', {
           method: 'POST',
           body: JSON.stringify({
               paymentProofLink: paymentProofLink
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       });

       alert('Data berhasil dikirim!');
   });
   