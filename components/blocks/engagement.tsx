"use client";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const EngagementSection = (props) => {
  const { title = "Seu time engajado e produtivo", description, heading, text } = props;
  
  return (
    <section className="bg-gradient-to-r from-primary to-red-700 py-16 md:py-24 section-illumination">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <h2 data-tina-field={tinaField(props, "title")} className="text-3xl md:text-4xl font-bold mb-6 text-white text-center md:text-left">
              {title || (Array.isArray(heading) || typeof heading === "object" ? (
                <TinaMarkdown content={heading} />
              ) : (
                heading?.split('\n').map((line, index) => (
                  <span key={index} className="block">
                    {line}
                    {index === 0 && <br className="hidden md:block" />}
                  </span>
                ))
              ))}
            </h2>
          </div>
          <div className="reveal">
            <div data-tina-field={tinaField(props, "description")} className="text-white text-lg mb-6">
              {description ? (
                <TinaMarkdown content={description} />
              ) : text ? (
                <TinaMarkdown content={text} />
              ) : (
                <p>
                  Soluções em performance e cultura organizacional para equipes mais produtivas e engajadas. Usando
                  inteligência artificial e experiência na área, entrego soluções práticas e efetivas e{" "}
                  <strong>capacito seu time para replicar as soluções quando quiser, sem depender de consultoria.</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
