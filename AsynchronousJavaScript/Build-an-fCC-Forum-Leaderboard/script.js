const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};

const postsContainer = document.getElementById('posts-container');

/**
 * Returns how long ago a timestamp was from the current time.
 * @param {string} timestamp - A timestamp in ISO 8601 format.
 * @returns {string} A formatted string in minutes, hours, or days ago.
 */
const timeAgo = (timestamp) => {
  if (!timestamp) {
    return "Date missing";
  }
  let currentTime = new Date();
  timestamp=new Date(timestamp);
const minutesAgo =( currentTime - timestamp) / (1000 *60);
let hoursAgo = (currentTime - timestamp) / (1000 *60 * 60);
let daysAgo = (currentTime - timestamp) / (1000 *60 * 60*24);
  
if (daysAgo>=1){
  return `${Math.floor(daysAgo)}d ago`
}
else if (hoursAgo>=1){
  return `${Math.floor(hoursAgo)}h ago`
}
else 
  return `${Math.floor(minutesAgo)}m ago`;
};

/**
 * Formats a view count.
 * @param {number} views - The number of views for a post.
 * @returns {string|number} A formatted view count.
 */
const viewCount = (views) => {
  if (views >= 1000) {
    return Math.floor(views/1000) +'k';
  }

  return views;
};

/**
 * Returns the category anchor element as a string.
 * @param {number} id - The selected category id.
 * @returns {string} A category link string.
 */
const forumCategory = (id) => {
  if (allCategories[id]) {
    return `<a class="category ${allCategories[id].className}" href="${forumCategoryUrl}${allCategories[id].className}/${id}">${allCategories[id].category}</a>`;
  }

  return `<a class="category general" href="${forumCategoryUrl}general/${id}">General</a>`;
};

/**
 * Returns A string of img tags. Also sets the avatar size to 30.
 * @param {array} posters - takes in an array of posters
 * @param {array} users - takes in an array of users
 * @returns {string} A single string made of multiples string.  
 */
const avatars = (posters, users) => {
  if (!posters || !users) {
    return '';
  }
  const imgStrings =[];
  posters.forEach((post)=> {
    const match= users.find((user)=> {
    return user.id === post.user_id;
  });
  
  if(match){
  match.avatar_template=`/user_avatar/${match.username}_30.png`
  let newString= `<img src="${avatarUrl}${match.avatar_template}" alt="${match.name}" >`
  imgStrings.push(newString)}
  })
  return imgStrings.join("");
};
/**
 * Renders the Topic container
 * @param {Object} data - JSON object of data.
 * @returns {array} Uses a map to return an array for all of the topics in the dataset.
 */
const showLatestPosts = (data) => {
  if (!data) {
    return;
  }
  const users =  data.users;
  const topic_list=  data.topic_list.topics;

return topic_list.map((topic)=>{
  postsContainer.innerHTML += `
  <tr>
  <td>
  <a class="post-title" href="${forumTopicUrl}${topic.slug}/${topic.id}">${topic.title}</a>
  ${forumCategory(topic.category_id)}
  </td>
  <td>
  <div class="avatar-container">
 ${avatars(topic.posters,users)}
  </div>
  </td>
  <td>${topic.posts_count - 1}</td>
  <td>${viewCount(topic.views)}</td>
  <td>${timeAgo(topic.bumped_at)}</td>
  </tr>`;
})
};

/**
 * A function to fetch the latest form data.
 * @returns {Object} Returns a JSON object and runs the showLatestPosts function.
 */
const fetchData = async () => {
  try {
    const response = await fetch(forumLatest);
    const finalResponse= await response.json()
    showLatestPosts(finalResponse);
    return;
  } catch (error) {
    console.log(error);
  }
};

fetchData();
console.log(timeAgo())