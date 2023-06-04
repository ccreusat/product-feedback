import { component$, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { z } from "@builder.io/qwik-city";
import { zod$ } from "@builder.io/qwik-city";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import ButtonGroup from "~/components/button-group/button-group";
import Button from "~/components/button/button";
import Fieldset from "~/components/fieldset/fieldset";
import GoBack from "~/components/go-back/go-back";
import Input from "~/components/input/input";
import Label from "~/components/label/label";
import Legend from "~/components/legend/legend";
import Select from "~/components/select/select";
import Textarea from "~/components/textarea/textarea";
import { selectList } from "~/constants/selectList";

export const useAddFeedback = routeAction$(
  async (data, { fail }) => {
    const result = await fetch("http://127.0.0.1:5173/api/feedbacks", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        upvotes: 0,
        status: "planned",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!result) {
      return fail(500, {
        message: "Feedback could not be added",
      });
    }
    return {
      success: true,
    };
  },
  zod$({
    title: z.string(),
    category: z.string(),
    description: z.string(),
  })
);

export default component$(() => {
  const action = useAddFeedback();
  const navigate = useNavigate();

  useTask$(({ track }) => {
    track(() => action.value);

    if (action.value?.success) {
      navigate("/");
    }
  });

  return (
    <div class="form-container form-container-md">
      <GoBack />
      <Form action={action} class="box py-24 px-24">
        <h1>Create New Feedback</h1>
        <Fieldset>
          <Legend>Feedback Title</Legend>
          <Label labelId="title">Add a short, descriptive headline</Label>
          <Input inputId="title" />
        </Fieldset>
        <Fieldset>
          <Legend>Category</Legend>
          <Label labelId="category">Choose a category for your feedback</Label>
          <Select selectId="category" list={selectList} />
        </Fieldset>
        <Fieldset>
          <Legend>Feedback Detail</Legend>
          <Label labelId="description">
            Include any specific comments on what should be improved, added,
            etc.
          </Label>
          <Textarea textareaId="description" />
        </Fieldset>
        <Fieldset>
          <ButtonGroup>
            <Button variant="secondary" onClick$={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit">Add Feedback</Button>
          </ButtonGroup>
        </Fieldset>
      </Form>
      {action.value?.success && <p>Feedback added successfully</p>}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Create a new feedback",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
