import { SCENARIO_API_URI } from "@/routes/route-api";
import axios from "axios";

export const listScenarios = async (userId) => {
	try {
		const config = {
			method: "get",
			maxBodyLength: Infinity,
			url: SCENARIO_API_URI.LIST_BY_ID(userId),
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		console.error("Error listing scenarios:", error);
		throw error;
	}
};

export const createScenario = async (obj) => {
	try {
		let data = JSON.stringify(obj);

		const config = {
			method: "post",
			maxBodyLength: Infinity,
			url: SCENARIO_API_URI.CREATE,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: data,
		};

		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		// console.error("Error creating scenario:", error);
		throw error;
	}
};

export const updateScenario = async (id, updatedData) => {
	try {
		let data = JSON.stringify(updatedData);

		const config = {
			method: "patch",
			maxBodyLength: Infinity,
			url: SCENARIO_API_URI.UPDATE_BY_ID,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: data,
		};

		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		// console.error("Error updating scenario:", error);
		throw error;
	}
};

export const deleteScenario = async (id) => {
	try {
		const config = {
			method: "delete",
			maxBodyLength: Infinity,
			url: SCENARIO_API_URI.DELETE_BY_ID(id),
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		const response = await axios.request(config);
		return response.data;
	} catch (error) {
		// console.error("Error deleting scenario:", error);
		throw error;
	}
};
