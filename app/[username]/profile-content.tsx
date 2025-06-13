/* eslint-disable @next/next/no-img-element */


import React from "react";
import type { UserData } from "@/lib/userdata.interface";
import { ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface ProfileContentProps {
    userData: UserData;
}

export default function ProfileContent({ userData }: ProfileContentProps) {
    const monthMap: { [key: number]: string } = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
        7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    };

    return (
        <div className="bg-white w-full h-full flex flex-col">
            <div className="max-w-4xl mx-5 lg:mx-auto bg-white text-gray-900 min-h-screen"
                style={{
                    backgroundImage: "url('/top-left-right.svg')"
                }}
            >
                <div className="h-10 flex justify-center items-center w-full"
                    style={{
                        backgroundImage: "url('/bottom.svg')"
                    }}
                >
                    <Link
                        href="https://zapfolio.in"
                        target='_blank'
                        className="text-sm text-black hover:text-violet-700 transition-colors flex items-center space-x-1"
                    >
                        <span>Build Your Portfolio</span>
                        <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
                    </Link>
                </div>
                <div className="py-12 md:py-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-8 px-4 md:px-16">
                        <div className="flex-shrink-0">
                            {userData.image ? (
                                <img
                                    src={`/api/proxy-image?url=${encodeURIComponent(userData.image)}`}
                                    alt={`${userData.firstName} ${userData.lastName}`}
                                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                                    <span className="text-4xl font-medium text-gray-500">
                                        {userData.firstName?.[0]}{userData.lastName?.[0]}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">
                                {userData.firstName} {userData.lastName}
                            </h1>
                            {userData.headline && (
                                <p className="text-gray-600 mb-6 text-lg">{userData.headline}</p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userData.contactInfo?.email && (
                                    <a href={`mailto:${userData.contactInfo.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                                        <Mail className="w-5 h-5" />
                                        <span>{userData.contactInfo.email}</span>
                                    </a>
                                )}
                                {userData.contactInfo?.phone && (
                                    <a href={`tel:${userData.contactInfo.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                                        <Phone className="w-5 h-5" />
                                        <span>{userData.contactInfo.phone}</span>
                                    </a>
                                )}
                                {userData.contactInfo?.address && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-5 h-5" />
                                        <span>{userData.contactInfo.address}</span>
                                    </div>
                                )}
                                {userData.contactInfo?.availabilityHours && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="w-5 h-5" />
                                        <span>{userData.contactInfo.availabilityHours}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    {userData.summary && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">About Me</h2>
                            <p className="text-gray-700 leading-relaxed">{userData.summary}</p>
                        </section>
                    )}

                    {/* Experience Section */}
                    {userData.jobExperience && userData.jobExperience.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Experience</h2>
                            <div className="space-y-10">
                                {userData.jobExperience.map((job, index) => (
                                    <div key={`exp-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center">
                                            {job.company?.imageUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(job.company.imageUrl)}`}
                                                        alt={job.company?.name || ''}
                                                        width={56}
                                                        height={56}
                                                        className="rounded object-cover border"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 bg-gray-100 border rounded flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-lg font-medium text-gray-500">
                                                        {job.company?.name?.[0] || 'C'}
                                                    </span>
                                                </div>
                                            )}
                                            {index < userData.jobExperience!.length - 1 && (
                                                <div className="h-24 w-2 flex justify-center">
                                                    <svg width="4" height="100%" viewBox="0 0 4 100" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="2" y1="0" x2="2" y2="100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div>
                                                <h3 className="font-medium text-xl">{job.company?.name}</h3>
                                                {job.employmentType && (
                                                    <p className="text-gray-500">{job.employmentType}</p>
                                                )}
                                            </div>
                                            <div className="space-y-6 mt-4">
                                                {job.positions && job.positions.map((position, posIndex) => (
                                                    <div key={`pos-${posIndex}`} className={posIndex > 0 ? 'border-t border-gray-100 pt-6' : ''}>
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="font-medium text-lg">{position.function}</h4>
                                                            {position.tenure && (
                                                                <p className="text-sm text-gray-500 whitespace-nowrap">
                                                                    {position.tenure.start?.month && position.tenure.start?.year
                                                                        ? `${monthMap[Number(position.tenure.start.month)]} ${position.tenure.start.year}`
                                                                        : position.tenure.start?.year || ''
                                                                    }
                                                                    {position.tenure.end
                                                                        ? ` - ${position.tenure.end.month && position.tenure.end.year
                                                                            ? `${monthMap[Number(position.tenure.end.month)]} ${position.tenure.end.year}`
                                                                            : position.tenure.end.year || 'Present'}`
                                                                        : ' - Present'
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                        {position.location && (
                                                            <p className="text-sm text-gray-500 mb-3">📍 {position.location}</p>
                                                        )}
                                                        {position.description && (
                                                            <p className="text-gray-700 mb-4 leading-relaxed">{position.description}</p>
                                                        )}
                                                        {position.skills && position.skills.length > 0 && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {position.skills.map((skill, sIndex) => (
                                                                    <span
                                                                        key={`skill-tag-${sIndex}`}
                                                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {userData.education && userData.education.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Education</h2>
                            <div className="space-y-10">
                                {userData.education.map((edu, index) => (
                                    <div key={`edu-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center">
                                            {edu.company?.imageUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(edu.company.imageUrl)}`}
                                                        alt={edu.company?.name || ''}
                                                        width={56}
                                                        height={56}
                                                        className="rounded object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {edu.company?.name?.[0] || 'E'}
                                                    </span>
                                                </div>
                                            )}
                                            {index < (userData.education?.length ?? 0) - 1 && (
                                                <div className="h-24 w-2 flex justify-center">
                                                    <svg width="4" height="100%" viewBox="0 0 4 100" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="2" y1="0" x2="2" y2="100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div>
                                                <h3 className="font-medium text-xl">{edu.company?.name}</h3>
                                                <p className="text-lg mb-1">{edu.subject}</p>
                                                {edu.tenure && (
                                                    <p className="text-sm text-gray-500 mb-3">
                                                        {edu.tenure.start?.year || ''}
                                                        {edu.tenure.end
                                                            ? ` - ${edu.tenure.end.year || 'Present'}`
                                                            : edu.tenure.start?.year ? ' - Present' : ''
                                                        }
                                                    </p>
                                                )}
                                                {edu.courseDescription && (
                                                    <p className="text-gray-700 leading-relaxed">{edu.courseDescription}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {userData.skills && userData.skills.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Skills</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {userData.skills.map((skill, index) => (
                                    <div
                                        key={`skill-${index}`}
                                        className="border border-gray-200 rounded px-4 py-3"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages Section */}
                    {userData.languages && userData.languages.length > 1 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Languages</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {userData.languages.map((lang, index) => (
                                    <div key={`lang-${index}`} className="border border-gray-200 rounded px-4 py-3 flex items-center justify-between">
                                        <span>{lang.language}</span>
                                        {lang.proficiency && (
                                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{lang.proficiency}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects Section */}
                    {userData.projects && userData.projects.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Projects</h2>
                            <div className="space-y-10">
                                {userData.projects.map((project, index) => (
                                    <div key={`proj-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center w-1/3">
                                            {project.imageUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1 w-full">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(project.imageUrl)}`}
                                                        alt={project.title || ''}
                                                        className="w-full h-48 object-cover rounded-md border"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 border rounded-md flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-2xl font-medium text-gray-500">
                                                        {project.title?.[0] || 'P'}
                                                    </span>
                                                </div>
                                            )}
                                            {index < (userData.projects?.length ?? 0) - 1 && (
                                                <div className="h-24 w-2 flex justify-center">
                                                    <svg width="4" height="100%" viewBox="0 0 4 100" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="2" y1="0" x2="2" y2="100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-medium text-xl">{project.title}</h3>
                                                {project.startDate && (
                                                    <p className="text-sm text-gray-500 whitespace-nowrap">
                                                        {project.startDate.month && project.startDate.year
                                                            ? `${monthMap[Number(project.startDate.month)]} ${project.startDate.year}`
                                                            : project.startDate.year || ''
                                                        }
                                                        {project.endDate
                                                            ? ` - ${project.endDate.month && project.endDate.year
                                                                ? `${monthMap[Number(project.endDate.month)]} ${project.endDate.year}`
                                                                : project.endDate.year || 'Present'}`
                                                            : project.ongoing ? ' - Present' : ''
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {project.description && (
                                                <p className="text-gray-700 mb-4">{project.description}</p>
                                            )}
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.technologies.map((tech, tIndex) => (
                                                        <span
                                                            key={`tech-${tIndex}`}
                                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {project.url && (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                                >
                                                    View Project <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Research Papers Section */}
                    {userData.researchPapers && userData.researchPapers.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Research Papers</h2>
                            <div className="space-y-6">
                                {userData.researchPapers.map((paper, index) => (
                                    <div key={`paper-${index}`} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                                        <h3 className="font-medium text-xl mb-2">{paper.title}</h3>
                                        {paper.authors && (
                                            <p className="text-gray-600 mb-2">By {paper.authors.join(', ')}</p>
                                        )}
                                        {paper.abstract && (
                                            <p className="text-gray-700 mb-4">{paper.abstract}</p>
                                        )}
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            {paper.journal && <span>📚 {paper.journal}</span>}
                                            {paper.publicationDate && (
                                                <span>
                                                    📅 {monthMap[Number(paper.publicationDate.month)]} {paper.publicationDate.year}
                                                </span>
                                            )}
                                            {paper.citations && <span>📊 {paper.citations} citations</span>}
                                        </div>
                                        {paper.url && (
                                            <a
                                                href={paper.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 mt-4"
                                            >
                                                Read Paper <ArrowUpRight className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Articles Section */}
                    {userData.articles && userData.articles.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Articles</h2>
                            <div className="space-y-10">
                                {userData.articles.map((article, index) => (
                                    <div key={`article-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center w-1/3">
                                            {article.imageUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1 w-full">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(article.imageUrl)}`}
                                                        alt={article.title || ''}
                                                        className="w-full h-48 object-cover rounded-md border"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 border rounded-md flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-2xl font-medium text-gray-500">
                                                        {article.title?.[0] || 'A'}
                                                    </span>
                                                </div>
                                            )}
                                            {index < (userData.articles?.length ?? 0) - 1 && (
                                                <div className="h-24 w-2 flex justify-center">
                                                    <svg width="4" height="100%" viewBox="0 0 4 100" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="2" y1="0" x2="2" y2="100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-medium text-xl">{article.title}</h3>
                                                {article.publishDate && (
                                                    <p className="text-sm text-gray-500 whitespace-nowrap">
                                                        {monthMap[Number(article.publishDate.month)]} {article.publishDate.year}
                                                    </p>
                                                )}
                                            </div>
                                            {article.platform && (
                                                <p className="text-gray-500 mb-2">{article.platform}</p>
                                            )}
                                            {article.summary && (
                                                <details className="mb-4">
                                                    <summary className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                        Read Summary
                                                    </summary>
                                                    <p className="text-gray-700 mt-2">{article.summary}</p>
                                                </details>
                                            )}
                                            {article.url && (
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                                >
                                                    Read Article <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Awards Section - Remove connecting lines */}
                    {userData.awards && userData.awards.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Awards & Recognition</h2>
                            <div className="space-y-10">
                                {userData.awards.map((award, index) => (
                                    <div key={`award-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center w-1/3">
                                            {award.imageUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1 w-full">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(award.imageUrl)}`}
                                                        alt={award.title || ''}
                                                        className="w-full h-48 object-contain rounded-md border"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 border rounded-md flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-2xl font-medium text-gray-500">
                                                        {award.title?.[0] || 'A'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-medium text-xl">{award.title}</h3>
                                                {award.date && (
                                                    <p className="text-sm text-gray-500 whitespace-nowrap">
                                                        {monthMap[Number(award.date.month)]} {award.date.year}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-gray-500 mb-2">{award.issuer}</p>
                                            {award.description && (
                                                <p className="text-gray-700">{award.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Gallery Section - Improved UI */}
                    {userData.gallery && userData.gallery.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
                                {userData.gallery.map((item, index) => (
                                    <div key={`gallery-${index}`} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="aspect-w-16 aspect-h-9">
                                            {item.imageUrl ? (
                                                <img
                                                    src={`/api/proxy-image?url=${encodeURIComponent(item.imageUrl)}`}
                                                    alt={item.title || ''}
                                                    className="w-full h-64 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                                                    <span className="text-2xl font-medium text-gray-500">
                                                        {item.title?.[0] || 'G'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                                            {item.description && (
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                                            )}
                                            <div className="flex flex-wrap gap-2">
                                                {item.category && (
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                        {item.category}
                                                    </span>
                                                )}
                                                {item.tags && item.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={`tag-${tagIndex}`}
                                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            {item.date && (
                                                <p className="text-sm text-gray-500 mt-3">
                                                    {monthMap[Number(item.date.month)]} {item.date.year}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications Section */}
                    {userData.certifications && userData.certifications.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Certifications</h2>
                            <div className="space-y-10">
                                {userData.certifications.map((cert, index) => (
                                    <div key={`cert-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center w-1/3">
                                            {cert.credentialUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1 w-full">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(cert.credentialUrl)}`}
                                                        alt={cert.name || ''}
                                                        className="w-full h-48 object-contain rounded-md border"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 border rounded-md flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-2xl font-medium text-gray-500">
                                                        {cert.name?.[0] || 'C'}
                                                    </span>
                                                </div>
                                            )}
                                            {index < (userData.certifications?.length ?? 0) - 1 && (
                                                <div className="h-24 w-2 flex justify-center">
                                                    <svg width="4" height="100%" viewBox="0 0 4 100" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="2" y1="0" x2="2" y2="100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-medium text-xl">{cert.name}</h3>
                                                {cert.issueDate && (
                                                    <p className="text-sm text-gray-500 whitespace-nowrap">
                                                        {monthMap[Number(cert.issueDate.month)]} {cert.issueDate.year}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-gray-500 mb-2">{cert.issuer}</p>
                                            {cert.expiryDate && (
                                                <p className="text-sm text-gray-500 mb-4">
                                                    Expires: {monthMap[Number(cert.expiryDate.month)]} {cert.expiryDate.year}
                                                </p>
                                            )}
                                            {cert.credentialUrl && (
                                                <a
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                                                >
                                                    View Credential <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Clients Section */}
                    {userData.clients && userData.clients.length > 0 && (
                        <section className="py-10 px-4 md:px-16"
                            style={{
                                backgroundImage: "url('/top.svg')"
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Clients</h2>
                            <div className="space-y-10">
                                {userData.clients.map((client, index) => (
                                    <div key={`client-${index}`} className="relative flex gap-6">
                                        <div className="flex flex-col items-center">
                                            {client.logoUrl ? (
                                                <div className="shrink-0 z-10 bg-white p-1">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(client.logoUrl)}`}
                                                        alt={client.name || ''}
                                                        width={56}
                                                        height={56}
                                                        className="rounded-md object-contain border"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 bg-gray-100 border rounded-md flex items-center justify-center shrink-0 z-10 p-1">
                                                    <span className="text-lg font-medium text-gray-500">
                                                        {client.name?.[0] || 'C'}
                                                    </span>
                                                </div>
                                            )}
                                            {index < (userData.clients?.length ?? 0) - 1 && (
                                                <div className="h-24 w-2 flex justify-center">
                                                    <svg width="4" height="100%" viewBox="0 0 4 100" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="2" y1="0" x2="2" y2="100" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-medium text-xl">{client.name}</h3>
                                                {client.startDate && (
                                                    <p className="text-sm text-gray-500 whitespace-nowrap">
                                                        {client.startDate.month && client.startDate.year
                                                            ? `${monthMap[Number(client.startDate.month)]} ${client.startDate.year}`
                                                            : client.startDate.year || ''
                                                        }
                                                        {client.endDate
                                                            ? ` - ${client.endDate.month && client.endDate.year
                                                                ? `${monthMap[Number(client.endDate.month)]} ${client.endDate.year}`
                                                                : client.endDate.year || 'Present'}`
                                                            : client.ongoing ? ' - Present' : ''
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {client.industry && (
                                                <p className="text-gray-500 mb-2">{client.industry}</p>
                                            )}
                                            {client.workDescription && (
                                                <p className="text-gray-700 mb-4">{client.workDescription}</p>
                                            )}
                                            {client.testimonial && (
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-gray-700 italic mb-2">&ldquo;{client.testimonial.text}&rdquo;</p>
                                                    <p className="text-sm text-gray-600">
                                                        - {client.testimonial.author}
                                                        {client.testimonial.position && `, ${client.testimonial.position}`}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Zapfolio Call to Action */}
                    <section className="mb-8 pt-10 flex justify-center items-center"
                        style={{
                            backgroundImage: "url('/top-left-right.svg')"
                        }}
                    >
                        <div className="max-w-4xl mx-auto px-6">
                            <p>© {new Date().getFullYear()} - Built with <Link target="_blank" href="https://zapfolio.in" className="text-violet-600 hover:text-violet-700 transition-colors">Zapfolio</Link></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}


