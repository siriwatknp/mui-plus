"use client";

import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from "./ai-inline-citation";

export default function AIInlineCitationDemo() {
  const sources = [
    "https://react.dev/learn/thinking-in-react",
    "https://react.dev/learn/state-a-components-memory",
    "https://react.dev/learn/render-and-commit",
  ];

  const detailedSources = [
    {
      title: "Thinking in React",
      url: "https://react.dev/learn/thinking-in-react",
      description:
        "Learn how to think about building user interfaces with React's component model.",
      quote:
        "React can change how you think about the designs you look at and the apps you build.",
    },
    {
      title: "State: A Component's Memory",
      url: "https://react.dev/learn/state-a-components-memory",
      description:
        "Components often need to change what's on the screen as a result of an interaction.",
      quote: "State is like a component's memory.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Inline Citation
        </h3>
        <p className="text-sm text-muted-foreground">
          Display inline citations with hoverable source cards.
        </p>

        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            <InlineCitation>
              <InlineCitationText>
                React makes it painless to create interactive UIs by using a
                declarative approach
              </InlineCitationText>
              <InlineCitationCard>
                <InlineCitationCardTrigger sources={sources} />
                <InlineCitationCardBody>
                  <InlineCitationCarousel>
                    <InlineCitationCarouselHeader>
                      <InlineCitationCarouselPrev />
                      <InlineCitationCarouselIndex />
                      <InlineCitationCarouselNext />
                    </InlineCitationCarouselHeader>
                    <InlineCitationCarouselContent>
                      {detailedSources.map((source, index) => (
                        <InlineCitationCarouselItem key={index}>
                          <InlineCitationSource
                            title={source.title}
                            url={source.url}
                            description={source.description}
                          />
                          <InlineCitationQuote>
                            {source.quote}
                          </InlineCitationQuote>
                        </InlineCitationCarouselItem>
                      ))}
                    </InlineCitationCarouselContent>
                  </InlineCitationCarousel>
                </InlineCitationCardBody>
              </InlineCitationCard>
            </InlineCitation>
            . This design philosophy helps developers build maintainable
            applications.
          </p>

          <p className="text-sm leading-relaxed">
            Components are the building blocks of React applications.
            <InlineCitation>
              <InlineCitationText>
                They let you split the UI into independent, reusable pieces
              </InlineCitationText>
              <InlineCitationCard>
                <InlineCitationCardTrigger sources={[sources[0]]} />
                <InlineCitationCardBody>
                  <InlineCitationSource
                    title="React Components"
                    url="https://react.dev/learn/your-first-component"
                    description="Components are one of the core concepts of React."
                  />
                </InlineCitationCardBody>
              </InlineCitationCard>
            </InlineCitation>
            , and think about each piece in isolation.
          </p>
        </div>
      </div>
    </div>
  );
}
