import { PATHWAY_API_URI } from "@/routes/route-api";
import axios from "axios";
import uuid4 from "uuid4";

export const saveCourseLayout = async (
  name,
  category,
  level,
  courseLayout,
  description,
  duration,
  addVideos,
  createdBy
) => {
  try {
    var id = uuid4();
    let data = JSON.stringify({
      courseId: id,
      name,
      category,
      level,
      courseLayout,
      description,
      duration,
      addVideos,
      createdBy,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.SAVE_LAYOUT,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (e) {
    console.error("Error Saving Layout", error);
    throw error;
  }
};

export const generateCourseLayout = async (courseRecipe) => {
  try {
    let data = JSON.stringify({
      courseRecipe: courseRecipe,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.GENERATE_LAYOUT,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error Generating Layout", error);
    throw error;
  }
};

export const generateCourseContent = async (skill, chapterName) => {
  try {
    let data = JSON.stringify({
      skill,
      chapterName,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.GENERATE_CONTENT,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error Generating Content", error);
    throw error;
  }
};

export const getCourseLayout = async (createdBy, courseId) => {
  try {
    let data = JSON.stringify({
      courseId,
      createdBy,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.GET_COURSE,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Fetching Layout", error);
    throw error;
  }
};

export const updateCourseLayout = async (id, course) => {
  try {
    let data = JSON.stringify({
      id,
      courseLayout: course,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.UPDATE_COURSE,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Updating Layout", error);
    throw error;
  }
};

export const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
    type: "video",
  };
  console.log(params);
  const response = await axios.get(PATHWAY_API_URI.YOUTUBE_BASE, { params });
  return response.data.items;
};

export const getCourseByCreatorId = async (createdBy) => {
  try {
    let data = JSON.stringify({
      createdBy: createdBy,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.GET_COURSE_BY_ID,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Getting Courses", error);
    throw error;
  }
};

export const deleteCourseByCourseId = async (courseId) => {
  try {
    const data = JSON.stringify({
      courseId: courseId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.DELETE_COURSE_BY_ID, // Replace with your endpoint URL
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Deleting Course", error);
    throw error;
  }
};

export const publishCourseByCourseId = async (courseId) => {
  try {
    const data = JSON.stringify({
      courseId: courseId,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.PUBLISH_COURSE_BY_ID, // Replace with your endpoint URL
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.lo;
    return response;
  } catch (error) {
    console.error("Error Publishing Course", error);
    throw error;
  }
};

export const markChapter = async (chapterId, courseId, content, videoId) => {
  try {
    let data = JSON.stringify({
      chapterId,
      courseId,
      content,
      videoId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.MARK_CHAPTER,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Marking Chapters", error);
    throw error;
  }
};

export const getChapterByCourse = async (courseId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.GET_CHAPTER_BY_COURSE(courseId),
      headers: {},
    };

    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Fetching Chapters", error);
    throw error;
  }
};

export const getChapterByCourseAndChapter = async (courseId, chapterId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: PATHWAY_API_URI.GET_CHAPTER_BY_COURSE_CHAPTER(courseId, chapterId),
      headers: {},
    };

    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Fetching Chapters", error);
    throw error;
  }
};
