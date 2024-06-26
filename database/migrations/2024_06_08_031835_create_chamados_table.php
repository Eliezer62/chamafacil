<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chamados', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->string('nome_solicitante');
            $table->string('email_solicitante');
            $table->string('telefone_solicitante', 15);
            $table->string('assunto');
            $table->text('descricao');
            $table->string('local')->nullable();
            $table->dateTime('horario_atendimento')->nullable();

            $table->enum('prioridade', ['baixa', 'média', 'alta', 'urgente']);
            $table->integer('categoria_id');
            $table->uuid('suporte_id')->nullable();
            $table->softDeletes();
            $table->uuid("departament_id");

            $table->enum('status', ['aberto', 'andamento', 'fechado'])->default('aberto');

            //Constraint
            $table->foreign('suporte_id')
                    ->references('id')
                    ->on('users');

            $table->foreign('categoria_id')
                    ->references('id')
                    ->on('categorias');

            $table->foreign("departament_id")
                    ->references("id")
                    ->on("departaments");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chamados');
    }
};
