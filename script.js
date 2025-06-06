const photoInput = document.getElementById('photo-input');
const photoPreview = document.getElementById('photo-preview');
const memoryCount = document.getElementById('memory-count');
let photoCounter = 0;

function updateMemoryCount() {
  const count = photoPreview.children.length;
  if (count === 0) {
    memoryCount.textContent = "No memories yet - start by adding your first photo! 💖";
  } else if (count === 1) {
    memoryCount.textContent = "1 beautiful memory captured 💕";
  } else {
    memoryCount.textContent = `${count} precious memories in your collection ✨`;
  }
}

photoInput.addEventListener('change', () => {
  const files = photoInput.files;

  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;

    const reader = new FileReader();
    reader.onload = (e) => {
      photoCounter++;
      const container = document.createElement('div');
      container.className = 'photo-block';
      container.style.opacity = '0';
      container.style.transform = 'translateY(20px)';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = 'Remove this memory';
      deleteBtn.onclick = () => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          container.remove();
          updateMemoryCount();
        }, 300);
      };

      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = file.name;

      const caption = document.createElement('textarea');
      caption.placeholder = "Write your romantic caption here... 💕";

      const audioUploadDiv = document.createElement('div');
      audioUploadDiv.className = 'audio-upload';
      audioUploadDiv.innerHTML = '<div class="audio-text">Add a love song to this memory</div>';

      const audioInput = document.createElement('input');
      audioInput.type = 'file';
      audioInput.accept = 'audio/*';
      audioInput.style.display = 'none';

      const audioPlayer = document.createElement('audio');
      audioPlayer.controls = true;
      audioPlayer.style.display = 'none';

      audioUploadDiv.onclick = () => audioInput.click();

      audioInput.addEventListener('change', () => {
        const audioFile = audioInput.files[0];
        if (audioFile && audioFile.type.startsWith('audio/')) {
          const audioReader = new FileReader();
          audioReader.onload = (ev) => {
            audioPlayer.src = ev.target.result;
            audioPlayer.style.display = 'block';
            audioUploadDiv.innerHTML = `<div class="audio-text">🎵 ${audioFile.name}</div>`;
          };
          audioReader.readAsDataURL(audioFile);
        }
      });

      container.appendChild(deleteBtn);
      container.appendChild(img);
      container.appendChild(caption);
      container.appendChild(audioUploadDiv);
      container.appendChild(audioInput);
      container.appendChild(audioPlayer);
      photoPreview.appendChild(container);

      setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 100);

      updateMemoryCount();
    };
    reader.readAsDataURL(file);
  }

  photoInput.value = '';
});
