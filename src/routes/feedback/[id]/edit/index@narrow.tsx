import { $, component$, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { z, zod$ } from "@builder.io/qwik-city";
import { routeAction$ } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { Form, routeLoader$ } from "@builder.io/qwik-city";
import Fieldset from "~/components/fieldset/fieldset";
import GoBack from "~/components/go-back/go-back";
import Input from "~/components/input/input";
import Label from "~/components/label/label";
import Legend from "~/components/legend/legend";
import type { FeedbackProps } from "~/components/feedback/feedback";
import Textarea from "~/components/textarea/textarea";
import Button from "~/components/button/button";
import ButtonGroup from "~/components/button-group/button-group";
import { selectList } from "~/constants/selectList";
import Select from "~/components/select/select";

export const useFeedback = routeLoader$(async ({ params }) => {
  const abortController = new AbortController();
  const response = await fetch(
    `http://127.0.0.1:5173/api/feedbacks/${params.id}`,
    {
      signal: abortController.signal,
    }
  );
  const feedback = await response.json();
  return feedback as FeedbackProps;
});

export const useEditFeedback = routeAction$(
  async (data, { fail, params }) => {
    const result = await fetch(
      `http://127.0.0.1:5173/api/feedbacks/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
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
    status: z.string(),
    description: z.string(),
    upvotes: z.string().transform((value) => parseFloat(value)),
  })
);

export default component$(() => {
  const feedback = useFeedback();
  const navigate = useNavigate();
  const location = useLocation();
  const action = useEditFeedback();

  const deleteFeedback = $(async () => {
    await fetch(`http://127.0.0.1:5173/api/feedbacks/${location.params.id}`, {
      method: "DELETE",
    });
    navigate("/");
  });

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
        <h1>Editing "{feedback.value.title}"</h1>
        <Fieldset>
          <Legend>Feedback Title</Legend>
          <Label labelId="title">Add a short, descriptive headline</Label>
          <Input inputId="title" value={feedback.value.title} />
        </Fieldset>
        <Fieldset>
          <Legend>Category</Legend>
          <Label labelId="category">Choose a category for your feedback</Label>
          <Select
            selectId="category"
            list={selectList}
            selected={feedback.value.category}
          />
        </Fieldset>
        <Fieldset>
          <Legend>Update Status</Legend>
          <Label labelId="status">Change feedback state</Label>
          <Select
            selectId="status"
            list={[
              {
                value: "suggestion",
                name: "Suggestion",
              },
              {
                value: "planned",
                name: "Planned",
              },
              {
                value: "in-progress",
                name: "In-Progress",
              },
              {
                value: "live",
                name: "Live",
              },
            ]}
            selected={feedback.value.status}
          />
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
            <Button variant="danger" onClick$={deleteFeedback}>
              Delete
            </Button>
            <Button variant="secondary" onClick$={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </ButtonGroup>
        </Fieldset>
        <Input hidden inputId="upvotes" value={feedback.value.upvotes} />
      </Form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Edit feedback",
  meta: [
    {
      name: "description",
      content: "Edit feedback",
    },
  ],
};
