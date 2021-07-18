function getUsers() {
    fetch("https://60efffcaf587af00179d3c49.mockapi.io/users", {
      method: "GET"
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((users) => loadUsers(users));
  }
  function loadUsers(users) {
    const userList = document.createElement("div");
    userList.className = "user-list";
    users.forEach((user) => {
      const userContainer = document.createElement("div");
      userContainer.className = "user-container";
  
      userContainer.innerHTML = `
      <img class="user-image"  src=${user.avatar}> </img>
      <div>
        <h3 class="user-name">${user.name}</h3>
        <p class="user-time" >${new Date(user.createdAt).toDateString()}</p>
        <button onclick="deleteUser(${user.id})"> Delete </button>
      </div>
      `;
  
      userList.append(userContainer);
    });
  
    document.body.append(userList);
  }
  
  getUsers();
  
  function addUser() {
    const name = document.querySelector(".new-user-name").value;
    const avatar = document.querySelector(".new-profile-pic").value;
    const createdAt = new Date();
    const userDetails = {
      name: name,
      avatar: avatar,
      createdAt: createdAt
    };
  
   fetch("https://60efffcaf587af00179d3c49.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    })
      .then((users) => refreshUsers());
  
    console.log("Adding User....", userDetails);
  }
  function refreshUsers() {
    document.querySelector(".user-list").remove();
    getUsers();
  }
  
  
  function deleteUser(id) {
    console.log("Deleting", id);
  
    fetch(`https://60efffcaf587af00179d3c49.mockapi.io/users/${id}`, {
      method: "DELETE"
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((users) => refreshUsers());
  }
  