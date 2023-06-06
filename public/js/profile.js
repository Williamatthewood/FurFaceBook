const postList = document.querySelector('.post-list');

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const image = document.querySelector('#post-image').files[0];
  
    if (title && content) {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('content', content);
      if (image){
        formData.append('image', image);
      }
      
      try {
        const response = await fetch('/api/post', {
          method:'POST',
          body: formData,
        });

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create post');
        }
      }
      catch (error){
        console.error(error);
        alert('Failed to create post')
      }
  
      
    } else {
      alert("You must fill in both text boxes to submit your post!");
      return;
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  if (postList) {
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
  }