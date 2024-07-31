<template>
  <div class="login-container">
    <h1>{{ title }}</h1>
    <form @submit.prevent="handleLogin">
      <button @click="submitLogin" class="google-button">
        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" class="google-logo" />
        <span>用 Google 登入</span>
      </button>
      <button @click="getUserData">取得用戶資料</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '登入',
    };
  },
  methods: {
    submitLogin() {
      console.log('Attempting to login...');
      const loginUrl = '/api/OAuth_login';
      console.log('Redirecting to:', loginUrl);
      window.location.href = loginUrl;
    },
    getUserData() {
      fetch('/api/OAuth_user', {
        credentials: 'include',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  },
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

.google-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #4285F4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 10px;
  text-decoration: none;
}

.google-button:hover {
  background-color: #357ae8;
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3498DB;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

button:hover {
  background-color: #2980B9;
}
</style>
