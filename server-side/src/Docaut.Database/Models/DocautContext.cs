using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Docaut.Database.Models
{
    public partial class DocautContext : DbContext
    {
        public DocautContext()
        {
        }

        public DocautContext(DbContextOptions<DocautContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Template> Template { get; set; }
        public virtual DbSet<TemplateVersion> TemplateVersion { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=docaut_db;Username=frodo;Password=passw0rd");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("citext")
                .HasPostgresExtension("uuid-ossp")
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Template>(entity =>
            {
                entity.ToTable("template", "docaut");

                entity.HasIndex(e => e.UserId)
                    .HasName("template_user_id_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.CurrentVersion).HasColumnName("current_version");

                entity.Property(e => e.Deleted).HasColumnName("deleted");

                entity.Property(e => e.DuringEditing).HasColumnName("during_editing");

                entity.Property(e => e.LastUpdate)
                    .HasColumnName("updated_at")
                    .HasColumnType("timestamp with time zone");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                // entity.HasOne(d => d.User)
                //     .WithMany(p => p.Template)
                //     .HasForeignKey(d => d.UserId)
                //     .OnDelete(DeleteBehavior.ClientSetNull)
                //     .HasConstraintName("template_user_id_fkey");
            });

            modelBuilder.Entity<TemplateVersion>(entity =>
            {
                entity.ToTable("template_version", "docaut");

                entity.HasIndex(e => e.TemplateId)
                    .HasName("template_version_template_id_idx");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Content)
                    .IsRequired()
                    .HasColumnName("content")
                    .HasColumnType("json");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("timestamp with time zone")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.TemplateId).HasColumnName("template_id");

                // entity.HasOne(d => d.Template)
                //     .WithMany(p => p.TemplateVersion)
                //     .HasForeignKey(d => d.TemplateId)
                //     .OnDelete(DeleteBehavior.ClientSetNull)
                //     .HasConstraintName("template_version_template_id_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user", "docaut");

                entity.HasIndex(e => e.UserEmail)
                    .HasName("user_user_email_idx");

                entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasColumnName("user_email")
                    .HasColumnType("citext");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("user_name");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasColumnName("user_password");

                entity.Property(e => e.UserSurname)
                    .IsRequired()
                    .HasColumnName("user_surname");
            });
        }
    }
}
