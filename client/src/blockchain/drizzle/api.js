import { toast } from "react-toastify";
import Admin from "../abis/Admin.json";
import { db } from "../drizzle/drizzle";
import { eq, and } from "drizzle-orm";
import { users, chats } from "../schema/schema"; // Import the defined tables from your schema

export const messageAdmin = async (info, message) => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const AdminData = await Admin.networks[networkId];
  const admin = new web3.eth.Contract(Admin.abi, AdminData?.address);
  const owner = await admin.methods?.owner().call();

  let key =
    owner < accounts[0] ? owner + "#" + accounts[0] : accounts[0] + "#" + owner;

  try {
    // Insert a new chat message
    await db.insert(chats).values({
      key: key,
      message: message,
      sender: accounts[0],
      receiver: owner,
      timeStamp: new Date(),
      info: { ...info, ethAddress: accounts[0] },
    });

    // Check if the active chat exists
    const userChatExists = await db
      .select()
      .from(users)
      .where(
        and(eq(users.ethAddress, accounts[0]), eq(users.activeChat, owner))
      );

    if (!userChatExists) {
      // Insert active chat for the user
      await db.insert(users).values({
        ethAddress: accounts[0],
        activeChat: owner,
        name: "Admin",
      });

      // Insert active chat for the admin
      await db.insert(users).values({
        ethAddress: owner,
        activeChat: accounts[0],
        name: info.name,
      });
    }

    toast.success("One of the admins will get back to you shortly!");
  } catch (err) {
    console.error("Error sending message to admin:", err);
  }
};

export const reqWorkexpEndorsementFunc = async (workexp) => {
  const { organization, role, startdate, enddate, description } = workexp;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();

  let key =
    organization < accounts[0]
      ? organization + "#" + accounts[0]
      : accounts[0] + "#" + organization;

  try {
    // Insert a new chat message
    await db.insert(chats).values({
      key: key,
      message: "Please endorse!!",
      sender: accounts[0],
      receiver: organization,
      timeStamp: new Date(),
      info: {
        req: "Work Experience Endorsement Request",
        description,
        organization,
        startdate,
        enddate,
        role,
        ethAddress: accounts[0],
      },
    });

    // Check if the active chat exists
    const userChatExists = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.ethAddress, accounts[0]),
          eq(users.activeChat, organization)
        )
      );

    if (!userChatExists) {
      // Insert active chat for the user
      await db.insert(users).values({
        ethAddress: accounts[0],
        activeChat: organization,
        name: "Organization",
      });

      // Insert active chat for the organization
      await db.insert(users).values({
        ethAddress: organization,
        activeChat: accounts[0],
        name: "Employee",
      });
    }

    toast.success("Endorsement request sent!!");
  } catch (err) {
    console.error("Error requesting work experience endorsement:", err);
  }
};

export const reqEducationEndorsementFunc = async (education) => {
  const { institute, description, startdate, enddate } = education;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();

  let key =
    institute < accounts[0]
      ? institute + "#" + accounts[0]
      : accounts[0] + "#" + institute;

  try {
    // Insert a new chat message
    await db.insert(chats).values({
      key: key,
      message: "Please endorse!!",
      sender: accounts[0],
      receiver: institute,
      timeStamp: new Date(),
      info: {
        req: "Education Endorsement Request",
        description,
        institute,
        startdate,
        enddate,
        ethAddress: accounts[0],
      },
    });

    // Check if the active chat exists
    const userChatExists = await db
      .select()
      .from(users)
      .where(
        and(eq(users.ethAddress, accounts[0]), eq(users.activeChat, institute))
      )
      .one();

    if (!userChatExists) {
      // Insert active chat for the user
      await db.insert(users).values({
        ethAddress: accounts[0],
        activeChat: institute,
        name: "Institute",
      });

      // Insert active chat for the institute
      await db.insert(users).values({
        ethAddress: institute,
        activeChat: accounts[0],
        name: "Employee",
      });
    }

    toast.success("Endorsement request sent!!");
  } catch (err) {
    console.error("Error requesting education endorsement:", err);
  }
};

export const reqCertiEndorsementFunc = async (certification) => {
  const { name, organization, score } = certification;
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();

  let key =
    organization < accounts[0]
      ? organization + "#" + accounts[0]
      : accounts[0] + "#" + organization;

  try {
    // Insert a new chat message
    await db.insert(chats).values({
      key: key,
      message: "Please endorse!!",
      sender: accounts[0],
      receiver: organization,
      timeStamp: new Date(),
      info: {
        req: "Certification Endorsement Request",
        name,
        organization,
        score,
        ethAddress: accounts[0],
      },
    });

    // Check if the active chat exists
    const userChatExists = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.ethAddress, accounts[0]),
          eq(users.activeChat, organization)
        )
      )
      .one();

    if (!userChatExists) {
      // Insert active chat for the user
      await db.insert(users).values({
        ethAddress: accounts[0],
        activeChat: organization,
        name: "Certification Organization",
      });

      // Insert active chat for the organization
      await db.insert(users).values({
        ethAddress: organization,
        activeChat: accounts[0],
        name: "Certified Employee",
      });
    }

    toast.success("Endorsement request sent!!");
  } catch (err) {
    console.error("Error requesting certification endorsement:", err);
  }
};
