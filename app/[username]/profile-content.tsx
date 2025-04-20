/* eslint-disable @next/next/no-img-element */


import React from "react";
import type { UserData } from "@/lib/userdata.interface";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProfileContentProps {
    userData: UserData;
}

// Map month numbers to short month names
const monthMap: { [key: number]: string } = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
};

const ProfileContent: React.FC<ProfileContentProps> = ({ userData }) => {
    const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();

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
                    {/* Header Section - Adjusted for small screens */}
                    <header className="mb-10 px-4 md:px-16">
                        <div className="flex flex-col md:flex-row md:space-x-5 md:items-start md:justify-between">
                            <div className="md:max-w-xl mb-8 md:mb-0">
                                <h2 className="font-medium text-4xl mb-3">Hello! I am {fullName}</h2>
                                {userData.headline && (
                                    <p className="text-lg font-medium mb-6">{userData.headline}</p>
                                )}
                                {userData.publicIdentifier && (
                                    <a
                                        href={`https://linkedin.com/in/${userData.publicIdentifier}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        Connect with me on LinkedIn
                                    </a>
                                )}
                            </div>
                            {userData.image && (
                                <div className="shrink-0 w-40 h-40 md:w-56 md:h-56 mx-auto md:mx-0">
                                    <img
                                        src={`/api/proxy-image?url=${encodeURIComponent(userData.image)}`}
                                        alt={fullName}
                                        className="rounded-md object-cover border-4 w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    </header>

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
};

export default ProfileContent;


