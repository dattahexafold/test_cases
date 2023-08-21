import { mount } from "@vue/test-utils";
import LoginPage from "../components/pages/LoginPage.vue";
import axios from "axios";
import flushPromises from "flush-promises";
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/dashboard.vue"

// Mock the entire axios module
jest.mock("axios");

describe("LoginPage.vue", () => {

  it("displays an error message on failed login", async () => {
    axios.post.mockRejectedValue(new Error("Invalid username or password"));

    const wrapper = mount(LoginPage);

    // Set up mock values for form inputs
    wrapper.vm.form.username = "eve.holt@reqres.in";
    wrapper.vm.form.password = "cityslicka";

    //title
    const title = wrapper.find("h1");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Login");

    // Trigger form submission
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    const errorMessage = wrapper.find(".error");
    expect(errorMessage.exists()).toBe(true);
    // Check the error message text dynamically
    const expectedErrorMessage = "Invalid username or password";
    expect(errorMessage.text()).toContain(expectedErrorMessage);
  });

  // Expect error message to be displayed if exist inside element
  //   expect(wrapper.find(".error").text()).toContain(
  //     "Invalid username or password"
  //   );
  // });

  it("redirects to the dashboard on successful login", async () => {
     // Mock a successful Axios request with a token response
    axios.post.mockResolvedValue({ data: { token: "fakeToken" } });

    // Create a mock router with the '/dashboard' route
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/dashboard", name: "dashboard", component:Dashboard },
        // Other routes
      ],
    });

    router.push("/dashboard");
    await router.isReady();
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router], // Use the router in your component
      },
    });

    // Set up mock values for form inputs
    wrapper.vm.form.username = "eve.holt@reqres.in";
    wrapper.vm.form.password = "cityslicka";

    // Trigger form submission
    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    // Expect the router to have navigated to the '/dashboard' route
    expect(router.currentRoute.value.name).toBe("dashboard");
  });
});
