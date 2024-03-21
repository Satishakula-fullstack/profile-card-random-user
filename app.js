const iconList = document.querySelectorAll("li");

const generateProfile = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error("Failed to fetch user data");
    const data = await res.json();
    // console.log(data);
    displayUser(data.results[0]);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const displayUser = ({ name, email, dob, location, phone, login, picture }) => {
  const { first, last } = name;

  const date = new Date(dob.date);
  const formattedDOB = date.toLocaleDateString("en-US");
  const profileDes = document.querySelector(".profile-des");
  const profileInfo = document.querySelector(".profile-info");
  const imgEl = document.querySelector("img");
  imgEl.src = picture.large;
  const updateProfile = (infoText, desText) => {
    profileInfo.textContent = infoText;
    profileDes.textContent = desText;
  };
  updateProfile("Hi, My name is", `${first} ${last}`);

  iconList.forEach((icon) => {
    icon.addEventListener("mouseover", (e) => {
      switch (e.target.classList.value) {
        case "fa-solid fa-user fa-2x":
          updateProfile("Hi, My name is", `${first} ${last}`);
          break;
        case "fa-solid fa-envelope fa-2x":
          updateProfile("My email address is", email);
          break;
        case "fa-solid fa-calendar fa-2x":
          updateProfile("My birthday is", formattedDOB);
          break;
        case "fa-solid fa-map-location fa-2x":
          updateProfile(
            "My address is",
            `${location.city}, ${location.country}`
          );
          break;
        case "fa-solid fa-phone fa-2x":
          updateProfile("My phone is", phone);
          break;
        case "fa-solid fa-lock fa-2x":
          updateProfile("My password is", login.password);
          break;
        default:
          updateProfile("Hi, My name is", `${first} ${last}`);
          break;
      }
    });
  });
};
generateProfile();
